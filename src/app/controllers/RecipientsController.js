import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const recipients = await Recipients.create(req.body);

    return res.json(recipients);
  }

  async update(req, res) {
    const recipient = await Recipients.findByPk(req.params.id);

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
