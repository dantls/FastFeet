import { parseISO, isBefore, getHours } from 'date-fns';
import Order from '../models/Order';

class DeliveryStartController {
  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order is not found.' });
    }
    const { date } = req.body;
    if (isBefore(parseISO(date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }
    const hour = getHours(parseISO(date));

    if (!(hour >= 8 && hour <= 18)) {
      return res.status(400).json({ error: 'Time not allowed.' });
    }
    order.start_date = date;
    await order.save();

    return res.json(order);
  }
}

export default new DeliveryStartController();
