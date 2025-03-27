import st from "./circledText.module.css";

function CircledText({ text, colour }: { text: string, colour: string }) {
  return <div className={st.container + ' ' + st[colour]}>{text}</div>;
}

export default CircledText;
