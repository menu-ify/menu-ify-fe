import "./PreviewMenuItem.css"
import MenuItems from '../MenuItems/MenuItems'

export default function PreviewMenuItem({ name, description, image, price }) {

  return (
    <MenuItems name={name} description={description} image={image} price={price} />
  )
}