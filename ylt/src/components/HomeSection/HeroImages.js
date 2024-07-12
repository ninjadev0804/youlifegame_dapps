import React from "react"
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion"

import HockerImg from "../../assets/heroImages/hocker.svg"
import BasketballImg from "../../assets/heroImages/basketball.svg"
import HandballImg from "../../assets/heroImages/handball.svg"
import RugbyImg from "../../assets/heroImages/rugby.svg"
import SoccerImg from "../../assets/heroImages/soccer.svg"
import WomanSoccerImg from "../../assets/heroImages/womanSoccer.svg"
import WomanHandballImg from "../../assets/heroImages/womanHandball.svg"

export const HeroImages = () => {
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 0,
      transition: {
        staggerChildren: 1,
        when: "afterChildren",
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      transition: { duration: 16, repeat: Infinity },
    },
  }
  const item2 = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      transition: { duration: 16, repeat: Infinity },
    },
  }
  const item3 = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      transition: { duration: 16, repeat: Infinity },
    },
  }
  const item4 = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      transition: { duration: 16, repeat: Infinity },
    },
  }
  const item5 = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      transition: { duration: 16, repeat: Infinity },
    },
  }
  const item6 = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      transition: { duration: 16, repeat: Infinity },
    },
  }
  const item7 = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      transition: { duration: 16, repeat: Infinity },
    },
  }
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <AnimatePresence exit={{ opacity: 0, transition: { duration: 2 } }}>
        <motion.img
          className="image"
          variants={item}
          src={HockerImg}
          alt="hocker"
          width={500}
          height={500}
        />
      </AnimatePresence>
      <AnimatePresence exit={{ opacity: 0, transition: { duration: 2 } }}>
        <motion.img
          className="image"
          variants={item2}
          src={BasketballImg}
          alt="hocker"
          width={500}
          height={500}
        />
      </AnimatePresence>
      <AnimatePresence exit={{ opacity: 0, transition: { duration: 2 } }}>
        <motion.img
          className="image"
          variants={item3}
          src={HandballImg}
          alt="hocker"
          width={500}
          height={500}
        />
      </AnimatePresence>
      <AnimatePresence exit={{ opacity: 0, transition: { duration: 2 } }}>
        <motion.img
          className="image"
          variants={item4}
          src={RugbyImg}
          alt="hocker"
          width={500}
          height={500}
        />
      </AnimatePresence>
      <AnimatePresence exit={{ opacity: 0, transition: { duration: 2 } }}>
        <motion.img
          className="image soccer"
          variants={item5}
          src={SoccerImg}
          alt="hocker"
          width={500}
          height={500}
        />
      </AnimatePresence>
      <AnimatePresence exit={{ opacity: 0, transition: { duration: 2 } }}>
        <motion.img
          className="image soccer"
          variants={item6}
          src={WomanSoccerImg}
          alt="hocker"
          width={500}
          height={500}
        />
      </AnimatePresence>
      <AnimatePresence exit={{ opacity: 0, transition: { duration: 2 } }}>
        <motion.img
          className="image soccer"
          variants={item7}
          src={WomanHandballImg}
          alt="hocker"
          width={500}
          height={500}
        />
      </AnimatePresence>
    </motion.div>
  )
}
