import { parseISO, isBefore } from 'date-fns';
import Order from '../models/Order';
import Signature from '../models/Signature';

class DeliveryEndController {
  async update(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await Signature.create({ name, path });

    const isOrder = await Order.findByPk(req.body.order_id);
    if (!isOrder) {
      return res.status(400).json({ error: 'Order is not found.' });
    }
    if (!isOrder.start_date) {
      return res.status(400).json({ error: 'Delivery not started' });
    }
    const { date } = req.body;
    const current = parseISO(date);

    if (isBefore(current, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }
    if (isBefore(current, isOrder.start_date)) {
      return res.status(400).json({ error: 'End date less than start' });
    }

    const order = await isOrder.update({
      end_date: date,
      signature_id: file.id,
    });

    return res.json(order);
  }
}

export default new DeliveryEndController();
