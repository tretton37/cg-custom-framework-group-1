export default function hisafe(tagname: string, props: any, ...children: any) {

  const element = document.createElement(tagname);
  element.innerText = children;
  document.getElementById("app")!.appendChild(element);
  
}
