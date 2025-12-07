import "@/app/styles/footer.css";
import fita from 'public/fita.png';
import Image from 'next/image';

export default function Footer(){
  return (
    <footer>
      
        <p style={{color:'white'}}>Feito por <a href="">Emilly</a> e <a href="">Vinícius</a></p>
      
        <Image className='img-fita' src={fita} alt='imagem fita'/>
    </footer>
  )
}