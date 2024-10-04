export function render(componentName, props) {
  const element = document.createElement(componentName)
  fillProps(element, props)
  
  return element.shadowRoot
}

function fillProps(element, props) {
  for (const prop in props) {
    element[prop] = props[prop]
  }
}

export function click(element) {
  element.click()
}
