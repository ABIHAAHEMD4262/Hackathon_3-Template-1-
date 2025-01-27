//import font
import { Playfair_Display,Cinzel,Bodoni_Moda,Prata} from "next/font/google";
const Playfair = Playfair_Display({subsets:["latin"]});
const Cinze= Cinzel({subsets:["latin"]});
const Bodoni = Bodoni_Moda({subsets:["latin"]});
const Pra = Prata({subsets:["latin"],weight:"400"});
const Mod = Bodoni_Moda({subsets:["latin"],weight:"400"});


export default function Fonts (){
    return(
            <div className="bg-black w-full h-[122px] flex justify-center space-x-5 md:justify-between items-center px-9 flex-wrap md:mt-[131px]">
                <h1 className={`${Playfair.className} text-white text-2xl md:text-4xl`}>VERCASE</h1>
                <h1 className={`${Cinze.className} text-white text-2xl md:text-4xl`}>ZARA</h1>
                <h1 className={`${Bodoni.className} text-white text-2xl md:text-4xl`}>GUCCI</h1>
                <h1 className={`${Pra.className} text-white text-2xl md:text-4xl`}>PRADA</h1>
                <h1 className={`${Mod.className} text-white text-2xl md:text-4xl`}>Calvin Klein</h1>
               
                
            </div>
    )
}