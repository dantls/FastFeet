import * as Yup from 'yup';
import Courier from '../models/Courier';
import File from '../models/File';

class CourierController {
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

    const courierExists = await Courier.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (courierExists) {
      return res.status(401).json({ error: 'Courier already exists.' });
    }

    const courier = await Courier.create(req.body);

    return res.json(courier);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const courier = await Courier.findByPk(req.params.id);

    if (!courier) {
      return res.status(400).json({ error: 'Courier not found.' });
    }

    const { name, email } = await courier.update(req.body);

    return res.json({ name, email });
  }

  async delete(req, res) {
    const courier = await Courier.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (courier.deleted_at !== null) {
      return res.status(400).json({ error: 'Courier not found.' });
    }

    if (!courier) {
      return res.status(400).json({ error: 'Courier not found.' });
    }

    courier.deleted_at = new Date();

    await courier.save();

    return res.json(courier);
  }

  async index(req, res) {
    const couriers = await Courier.findAll({
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
    return res.json(couriers);
  }
}

export default new CourierController();
