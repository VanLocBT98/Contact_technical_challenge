import { dataMockForm } from "~/assets/dummy/mock";
import ContactFormStandard from "~/components/templates/ContactFormStandard";

export default function Standard() {
  return (
    <>    <ContactFormStandard
      {...dataMockForm.standard}
    /></>
  )
}
