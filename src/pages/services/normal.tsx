import { dataMockForm } from "~/assets/dummy/mock";
import ContactFormNormal from "~/components/templates/ContactFormNormal";

export default function Normal() {
  return (
    <> <ContactFormNormal
      {...dataMockForm.normal}
    /></>
  )
}
