import {} from 'date-fns@next';
import * as Yup from 'yup';

import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import Package from '../models/Package';

class PackageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      courierman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { recipient_id, courierman_id } = req.body;

    const isRecipient = await Recipient.findOne({
      where: { id: recipient_id },
    });
    if (!isRecipient) {
      return res.status(401).json({ error: 'Recipients is not found.' });
    }
    const isCourierman = await Courier.findOne({
      where: { id: courierman_id },
    });
    if (!isCourierman) {
      return res.status(401).json({ error: 'Courier is not found.' });
    }

    const pack = await Package.create(req.body);
    return res.json(pack);
  }

  async index(req, res) {
    const pack = await Package.findAll({
      where: {
        canceled_at: null,
      },
      include: [
        {
          model: Courier,
          attributes: ['name'],
        },
      ],
    });
    return res.json(pack);
  }

  async delete(req, res) {
    const pack = await Package.findByPk(req.params.id);

    if (!pack) {
      return res.status(401).json({ error: 'Package is not found.' });
    }
    pack.delete_at = new Date();
    pack.save();
    return res.json(pack);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      courierman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    return res.json();
  }
}

export default new PackageController();
