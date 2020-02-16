import * as Yup from 'yup';
import Queue from '../../lib/Queue';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import Order from '../models/Order';
import CancellationMail from '../jobs/CancellationMail';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const isRecipient = await Recipient.findOne({
      where: { id: recipient_id },
    });
    if (!isRecipient) {
      return res.status(401).json({ error: 'Recipients is not found.' });
    }
    const isDeliveryMan = await DeliveryMan.findOne({
      where: { id: deliveryman_id, deleted_at: null },
    });
    if (!isDeliveryMan) {
      return res.status(401).json({ error: 'Delivery Man is not found.' });
    }

    const pack = await Order.create(req.body);

    await Queue.add(CancellationMail.key, { isDeliveryMan, isRecipient });

    return res.json(pack);
  }

  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        canceled_at: null,
      },
      include: [
        {
          model: DeliveryMan,
          attributes: ['name'],
        },
      ],
    });
    return res.json(orders);
  }

  async delete(req, res) {
    const pack = await Order.findByPk(req.params.id);

    if (!pack) {
      return res.status(401).json({ error: 'Order is not found.' });
    }
    pack.delete_at = new Date();
    pack.save();
    return res.json(pack);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    return res.json();
  }
}

export default new OrderController();
