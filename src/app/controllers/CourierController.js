import Courier from '../models/Courier';

class CourierController {
  async store(req, res) {
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
    const courier = await Courier.findByPk(req.params.id);

    if (!courier) {
      return res.status(400).json({ error: 'Courier not found.' });
    }

    const { name, email } = await courier.update(req.body);

    return res.json({ name, email });
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new CourierController();
