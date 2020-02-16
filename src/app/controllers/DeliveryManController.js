import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryManExists = await DeliveryMan.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (deliveryManExists) {
      return res.status(401).json({ error: 'DeliveryMan already exists.' });
    }

    const deliveryMan = await DeliveryMan.create(req.body);

    return res.json(deliveryMan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryMan = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryMan) {
      return res.status(400).json({ error: 'DeliveryMan not found.' });
    }

    const { name, email } = await deliveryMan.update(req.body);

    return res.json({ name, email });
  }

  async delete(req, res) {
    const deliveryMan = await DeliveryMan.findOne({
      where: {
        id: req.params.id,
        deleted_at: null,
      },
    });
    if (!deliveryMan) {
      return res.status(400).json({ error: 'DeliveryMan not found.' });
    }

    deliveryMan.deleted_at = new Date();

    await deliveryMan.save();

    return res.json(deliveryMan);
  }

  async index(req, res) {
    const deliveryMans = await DeliveryMan.findAll({
      where: {
        deleted_at: null,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveryMans);
  }
}

export default new DeliveryManController();
