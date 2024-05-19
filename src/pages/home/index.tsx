import { dataOption } from "~/assets/dummy/mock";
import Card from "~/components/organisms/Card";
import './index.scss';
export default function HOme() {
  return (
    <div className="p-home">
      <div className="p-home_list">

        {dataOption.map((item, idx) => (<Card.Division
          key={idx}
          {...item}
        />))}</div>
    </div>
  )
}
