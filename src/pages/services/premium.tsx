import { dataMockForm } from "~/assets/dummy/mock";
import ContactFormPremium from "~/components/templates/ContactFormPredium";

export default function Premium() {
  return (
    <> <ContactFormPremium
      {...dataMockForm.premium}
    /></>
  )
}
