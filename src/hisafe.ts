export default function hisafe(tagname: string, props: any, ...children: any) {
  const element = document.createElement(tagname);

  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      element.setAttribute(key, val as string);
      element[key] = val;
      //(element as any).setLabel(val);
    });
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      element.innerText = child;
    } else {
      element.appendChild(child);
    }
  });
  return element;
}
