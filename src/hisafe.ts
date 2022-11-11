export default function hisafe(tagname: string, props: any, ...children: any) {
  const element = document.createElement(tagname);

  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      if (key.startsWith('on')) {
        const eventName = `${key.substring(2, 3).toLowerCase()}${key.substring(3)}`;
        element.addEventListener(eventName, val as any);
      } else {
        element.setAttribute(key, val as string);
        element[key] = val;
      }
    });
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.innerText = child;
    } else if (Array.isArray(child)) {
      element.append(...child)
    } else {
      element.appendChild(child);
    }
  });
  return element;
}
