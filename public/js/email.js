import emailjs from '@emailjs/browser'
import AWN from "awesome-notifications"

const PUBLIC_KEY = '0-A5Z1JO6w_qMxFGr'
const SERVICE_ID = 'service_0atfyzg'
const TEMPLATE_ID = 'template_g5ufepa'

async function sendEmail({ templateParams, message }) {
    try {
        const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        let globalOptions = { }
        let notifier = new AWN(globalOptions)

        notifier.success(message)
        console.log(res);

    } catch (error) {
        console.log(error);
    }
}