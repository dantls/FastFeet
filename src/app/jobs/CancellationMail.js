import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { isDeliveryMan, isRecipient } = data;
    await Mail.sendMail({
      to: `${isDeliveryMan.name} <${isDeliveryMan.email}>`,
      subject: 'Nova Entrega',
      template: 'cancellation',
      context: {
        deliveryman: isDeliveryMan.name,
        recipient: isRecipient.name,
        address: isRecipient.street,
      },
    });
  }
}
export default new CancellationMail();
