export default function hisafe(tagname: string, props: any, ...children: any) {
  const element = document.createElement(tagname);
  children.forEach((child) => {
    if (typeof child === 'string') {
      element.innerText = child;
    } else {
      element.appendChild(child);
    }
  });
  return element;
}
