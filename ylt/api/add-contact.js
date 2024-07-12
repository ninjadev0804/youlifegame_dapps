const client = require("@sendgrid/client")

export default function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send("400 Bad Request")
  }
  const { email } = req.body

  client.setApiKey(process.env.SENDGRID_API_KEY)
  const data = {
    contacts: [
      {
        email: email,
      },
    ],
  }
  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  }
  try {
    client
      .request(request)
      .then(([response, body]) => {
        res.status(200).json({ success: "contact created" })
      })
      .catch((err) => {
        res.status(400).json({ err: "error" })
      })
  } catch (e) {
    res.status(400).json({ err: "error" })
  }
}
