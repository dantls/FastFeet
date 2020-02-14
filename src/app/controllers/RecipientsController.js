import Recipient from '../models/Recipient';

class RecipientsController {
  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json('User not found.');
    }

    const {
      name,
      street,
      street_complement,
      number,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      name,
      street,
      street_complement,
      number,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientsController();
