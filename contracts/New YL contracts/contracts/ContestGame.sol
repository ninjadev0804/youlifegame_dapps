//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./YLVault.sol";
import "./YLProxy.sol";

contract ContestGame {
    IERC721 public ylNFTERC721;
    IERC1155 public ylNFTERC1155;
    IERC20 public ylERC20;
    YLProxy public ylProxy;
    YLVault public vaultAddress;
    uint public tokensNeededPlay;

    /// @dev Match struct to store the match info
    struct Match {
        string category; /// @param SportCategory
        address[2] players; /// @param players address array representing players in this battle
        address winner; /// @param winner winner address
    }
    
    // Index for the won, draw and lost matchs per address. 1- Won matchs, 2- Lost matchs, 3- Draws
    mapping(address => mapping(uint8 => uint)) private resultsPlayer; 
    // SportCategory => MatchCounter => MatchInfo
    mapping(string => mapping(uint => Match)) private matchIndex;
    // SportCategory => MatchCounter
    mapping(string => uint) private matchCounter;
    // TournamentID => player =>  Tournament FeePaid
    mapping(uint => mapping(address => bool)) public feePaid;
    // Tournament ID => tournament Fee
    mapping(uint => uint) public tournamentFee;

    event MatchFinished(address winner, string category, address looser, uint matchID, uint settedTime);
    event TournamentCommissionSetted(uint settedFee, uint settedTime);
    event TournamentFeePaid(address player, uint tournamentID, uint settedTime);
    event MinTokensStakedPlayUpdated(uint minYLTStaked, uint settedTime);

    modifier onlyOwner() {
        ylProxy.owner() == msg.sender;
        _;
    }

    constructor(IERC721 _ylNFTERC721, IERC1155 _ylNFTERC1155, IERC20 _ylERC20, YLProxy _ylProxy, YLVault _vault) {
        ylNFTERC721 = _ylNFTERC721;
        ylNFTERC1155 = _ylNFTERC1155;
        ylERC20 = _ylERC20;
        ylProxy = _ylProxy;
        vaultAddress = _vault;
    }

    // Play function, If we leave the _tournament parameter as 0 it will take it as a daily game. 
    function play(address _player1, uint _score1, address _player2, uint _score2, string memory _category, uint8 _tournamentID) external onlyOwner{
        require(ylProxy.totalStakedAmount(_player1, address(ylERC20)) >= tokensNeededPlay, "Stake more YLT");
        require(ylProxy.totalStakedAmount(_player2, address(ylERC20)) >= tokensNeededPlay, "Stake more YLT");
        require(YLVault(vaultAddress).checkElegible(_player1, _category) == true, "You are not elegible.");
        require(YLVault(vaultAddress).checkElegible(_player2, _category) == true, "You are not elegible.");

        // If we add the tournament ID, it will check if they paid for the tournament fee. 
        // The first tournament ID must be 1.
        if(_tournamentID > 0) {
            require(feePaid[_tournamentID][_player1], "Player1 did`nt pay tournamentFee.");
            require(feePaid[_tournamentID][_player2], "Player2 did`nt pay tournamentFee.");
        }
        
        address winner;
        address looser;
        uint _randomCoheficient1 = random(_player1);
        uint _randomCoheficient2 = random(_player2);

        if((_score1 + _randomCoheficient1) > (_score2 + _randomCoheficient2)) {
            winner = _player1;
            looser = _player2;
            resultsPlayer[winner][1]++; //Increment wins
            resultsPlayer[looser][2]++; // Increment looses

        }else if((_score1 + _randomCoheficient1) < (_score2 + _randomCoheficient2)) {
            winner = _player2;
            looser = _player1;
            resultsPlayer[winner][1]++; //Increment wins
            resultsPlayer[looser][2]++; // Increment looses
        } else {
            winner = address(0); // Draw
            looser = address(0); 
            resultsPlayer[winner][3]++; //Increment draws
            resultsPlayer[looser][3]++; // Increment draws
        }

        Match memory _match = Match (
            _category,
            [_player1, _player2],
            address(winner)
        );
        matchIndex[_category][matchCounter[_category]] = _match;

        emit MatchFinished(winner, _category, looser, matchCounter[_category], block.timestamp);
        matchCounter[_category]++;
    }

    // Generates a random number from 1 to 9
    function random(address _player) internal view returns (uint) {
    uint randomnumber = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, _player))) % 9;
    randomnumber++;
    return randomnumber;
    }

    // Pay YLT fee to be elegible for a tournament, passing the tournament ID.
    function payTournamentFee(uint8 _tournamentID) external {
        require(!feePaid[_tournamentID][msg.sender], "You have already paid the fee");
        ylERC20.transferFrom(msg.sender, vaultAddress.treasuryAddress(), tournamentFee[_tournamentID]);
        feePaid[_tournamentID][msg.sender] = true;
        emit TournamentFeePaid(msg.sender, _tournamentID, block.timestamp);
    }

    function withdrawFunds(address payable _to, uint _amount) external onlyOwner{
        payable(_to).transfer(_amount);
    }

    // Setter for the tournament Fee.
    function setTournamentFee(uint _tournamentID, uint _fee) external onlyOwner{
        tournamentFee[_tournamentID] = _fee;
        emit TournamentCommissionSetted(_fee, block.timestamp);
    }

    // Setter for the minimum a player needs to stake to play
    function setMinStakedPlay(uint _amount) external onlyOwner{
        tokensNeededPlay = _amount;
        emit MinTokensStakedPlayUpdated(_amount, block.timestamp);
    }

    // Getter if the player is elegible to play based on the YLT staked.
    function isElegible(address _player) public view returns(bool) {
        require(ylProxy.totalStakedAmount(_player, address(ylERC20)) >= tokensNeededPlay, "You need to stake more YLT");
        return true;
    }

    // Getter for TournamentFee to access the tournament.
    function getTournamentFee(uint _tournamentID) external view returns(uint){
        return tournamentFee[_tournamentID];
    }

    // Getter for Match details.
    function getMatch(string calldata _category, uint _matchId) public view returns(Match memory){
        return matchIndex[_category][_matchId];
    }

    // Getter for total wins, draw and looses by player. 1- Wins, 2- Looses, 3- Draws.
    function getPlayerRecord(address _player, uint8 _decision) public view returns(uint){
        return resultsPlayer[_player][_decision];
    }
}