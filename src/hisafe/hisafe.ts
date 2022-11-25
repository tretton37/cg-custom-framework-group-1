export default function hisafe(tagname: string, props: any, ...children: any) {
  const element = document.createElement(tagname);

  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      if (key.startsWith('on')) {
        const eventName = `${key.substring(2, 3).toLowerCase()}${key.substring(
          3
        )}`;
        element.addEventListener(eventName, (e) => {
          if (e instanceof CustomEvent && e.detail?.isHighSafeEvent === true) {
            (val as EventListener)(e.detail.payload);
          } else {
            (val as EventListener)(e);
          }
        });
      } else {
        element.setAttribute(key, val as string);
        element[key] = val;
      }
    });
  }

  children.forEach((child) => {
    if (!child) {
      // do nothing (assume conditional)
    } else if (typeof child === 'string') {
      const lastChild = element.lastChild;
      // no children
      if (lastChild == null) {
        element.innerHTML += child;
      }
      // has children
      else if (lastChild['insertAdjacentHTML'])  {
        (lastChild as any).insertAdjacentHTML('afterend', child)
      }
      // plain text
      else if (lastChild.nodeName === '#text') {
        element.innerHTML += child;
      }
    } else if (Array.isArray(child)) {
      element.append(...child);
    } else {
      element.appendChild(child);
    }
  });
  return element;
}
