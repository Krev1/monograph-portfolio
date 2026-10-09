"use client";

/**
 * Original vector recreation inspired by the Decadriver reference photo:
 * white dial face, silver annulus, dark central lens, green status LED,
 * two tricolor grip pods, and a rotating central reader.
 * Mechanical groups are separately animated by --ex-open-p (0..1).
 */
export default function DecadriverModel({activated=false}:{activated?:boolean}){
 const symbols=[
  {x:404,y:168,r:-28},{x:477,y:132,r:0},{x:566,y:156,r:22},
  {x:624,y:225,r:65},{x:597,y:333,r:128},{x:511,y:372,r:180},
  {x:416,y:339,r:216},{x:372,y:250,r:265}
 ];
 return <div className={"dx-model "+(activated?"dx-model-activated":"")} aria-hidden="true">
  <svg className="dx-svg" viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg" role="presentation">
   <defs>
    <linearGradient id="dxAlloy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FAFCFF"/><stop offset=".19" stopColor="#8F929D"/><stop offset=".39" stopColor="#25232A"/><stop offset=".67" stopColor="#A6AAB6"/><stop offset="1" stopColor="#3C3943"/></linearGradient>
    <linearGradient id="dxSilver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EFF4FA"/><stop offset=".23" stopColor="#9AA3B0"/><stop offset=".55" stopColor="#F1F3F5"/><stop offset=".83" stopColor="#787E88"/><stop offset="1" stopColor="#FCFDFE"/></linearGradient>
    <linearGradient id="dxWhite" x1="0" y1="0" x2=".9" y2="1"><stop offset="0" stopColor="#FEFAF4"/><stop offset=".55" stopColor="#E8E7E4"/><stop offset="1" stopColor="#C5C4C4"/></linearGradient>
    <radialGradient id="dxLens"><stop offset=".0" stopColor="#030507"/><stop offset=".72" stopColor="#101116"/><stop offset=".84" stopColor="#252930"/><stop offset="1" stopColor="#06070A"/></radialGradient>
    <radialGradient id="dxGreen"><stop offset=".12" stopColor="#D9FFDE"/><stop offset=".43" stopColor="#08E788"/><stop offset=".8" stopColor="#04673C"/><stop offset="1" stopColor="#043324"/></radialGradient>
    <radialGradient id="dxPink"><stop offset=".15" stopColor="#FFF2FC"/><stop offset=".6" stopColor="#E6A7C8"/><stop offset="1" stopColor="#813C68"/></radialGradient>
    <radialGradient id="dxBlue"><stop offset=".15" stopColor="#E1FBFF"/><stop offset=".6" stopColor="#5CB5F4"/><stop offset="1" stopColor="#24588A"/></radialGradient>
    <radialGradient id="dxActivated"><stop offset="0" stopColor="#FFAEE0"/><stop offset=".22" stopColor="#FF41A7"/><stop offset=".73" stopColor="#5F103D"/><stop offset="1" stopColor="#110815"/></radialGradient>
    <filter id="dxShadow"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="dxGlow" x="-80%" width="260%" y="-80%" height="260%"><feGaussianBlur stdDeviation="7"/></filter>
    <pattern id="dxGrooves" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#16141A"/><rect x="5" width="3" height="16" fill="#3F3C47"/><rect x="11" width="2" height="16" fill="#2A2832"/></pattern>
    <g id="dxIcon"><path d="M0 -13 L6 -5 L16 -8 L10 1 L17 10 L5 7 L0 16 L-5 7 L-17 10 L-10 1 L-16 -8 L-6 -5Z" fill="#171719"/><circle r="3" fill="#F0EFEE"/></g>
    <g id="dxTriLights">
     <rect x="-13" y="-34" width="217" height="68" rx="20" fill="#080A10" stroke="#C5C5D0" strokeWidth="5"/>
     <circle cx="25" cy="0" r="30" fill="#15171E" stroke="#9BA6B5" strokeWidth="4"/><circle cx="25" cy="0" r="22" fill="url(#dxGreen)" stroke="#D7F9E1" strokeWidth="2"/>
     <circle cx="95" cy="0" r="30" fill="#15171E" stroke="#9BA6B5" strokeWidth="4"/><circle cx="95" cy="0" r="22" fill="url(#dxPink)" stroke="#FFD7ED" strokeWidth="2"/>
     <circle cx="165" cy="0" r="30" fill="#15171E" stroke="#9BA6B5" strokeWidth="4"/><circle cx="165" cy="0" r="22" fill="url(#dxBlue)" stroke="#D4F1FF" strokeWidth="2"/>
    </g>
   </defs>
   <ellipse cx="502" cy="475" rx="445" ry="27" opacity=".63" fill="#000" filter="url(#dxShadow)"/>
   <path d="M0 229H1000V294H0Z" fill="#1C1B25" stroke="#6D6878" strokeWidth="5"/>
   {Array.from({length:35},(_,i)=><path key={i} d={"M"+(i*30-15)+" 232V290"} stroke="#474450" strokeWidth="2" opacity=".7"/>)}
   <g className="dx-mechanical-left">
    <path d="M25 206L66 139L259 112L313 155L313 365L259 409L66 380L25 315Z" fill="url(#dxAlloy)" stroke="#C9CCD3" strokeWidth="7"/>
    <path d="M66 204L91 172L262 151L275 205L275 317L262 368L91 348L66 314Z" fill="url(#dxGrooves)" stroke="#202029" strokeWidth="9"/>
    <path d="M42 233L267 229M42 288L267 288" stroke="url(#dxSilver)" strokeWidth="16" strokeLinecap="round"/>
    <path d="M88 177L269 144" stroke="#F1EEF4" strokeWidth="7" opacity=".85"/><path d="M88 348L269 382" stroke="#F1EEF4" strokeWidth="7" opacity=".85"/>
    <use href="#dxTriLights" x="47" y="260"/>
    <path d="M261 139L306 157V361L261 390Z" fill="url(#dxAlloy)" stroke="#BEC4CC" strokeWidth="6"/>
   </g>
   <g className="dx-mechanical-right">
    <path d="M975 206L934 139L741 112L687 155L687 365L741 409L934 380L975 315Z" fill="url(#dxAlloy)" stroke="#C9CCD3" strokeWidth="7"/>
    <path d="M934 204L909 172L738 151L725 205L725 317L738 368L909 348L934 314Z" fill="url(#dxGrooves)" stroke="#202029" strokeWidth="9"/>
    <path d="M958 233L733 229M958 288L733 288" stroke="url(#dxSilver)" strokeWidth="16" strokeLinecap="round"/>
    <path d="M912 177L731 144" stroke="#F1EEF4" strokeWidth="7" opacity=".85"/><path d="M912 348L731 382" stroke="#F1EEF4" strokeWidth="7" opacity=".85"/>
    <use href="#dxTriLights" x="570" y="260"/>
    <path d="M739 139L694 157V361L739 390Z" fill="url(#dxAlloy)" stroke="#BEC4CC" strokeWidth="6"/>
   </g>
   <g className="dx-spindle"><rect x="380" y="64" width="240" height="389" rx="26" fill="url(#dxGrooves)" stroke="#7E657B" strokeWidth="11"/><rect x="401" y="94" width="198" height="322" rx="15" fill="#090B0F" stroke="#E870B2" strokeWidth="6"/><path d="M432 108V385M455 108V385M478 108V385M500 108V385M522 108V385M545 108V385M568 108V385" stroke="#9A457B" strokeWidth="6" opacity=".8"/></g>
   <g className="dx-face-rotor">
    <path d="M366 72H632L670 111V402L630 442H370L330 402V111Z" fill="#16161C" stroke="#323038" strokeWidth="11"/>
    <path d="M370 79H629L652 111V200H349V111Z" fill="url(#dxWhite)" stroke="#A6A6AC" strokeWidth="6"/>
    <path d="M349 311H652V396L625 432H371L349 396Z" fill="url(#dxWhite)" stroke="#A6A6AC" strokeWidth="6"/>
    <path d="M346 203H656V308H346Z" fill="#0D0E13"/>
    <path d="M370 91H630L642 106H358Z" fill="url(#dxSilver)"/>
    <text x="500" y="111" textAnchor="middle" fontSize="20" letterSpacing="10" fontFamily="Arial,sans-serif" fontWeight="bold" fill="#4B4C56">DECADE</text>
    <circle cx="501" cy="257" r="156" fill="#161A1E" stroke="#7E8792" strokeWidth="8"/>
    <circle cx="501" cy="257" r="139" fill="url(#dxSilver)" stroke="#F9FAFB" strokeWidth="7"/>
    {Array.from({length:13},(_,i)=><circle key={i} cx="501" cy="257" r={138-i*3.5} stroke={i%2?"#616B78":"#E0E4E8"} strokeWidth=".8" fill="none" opacity=".5"/>)}
    <circle cx="501" cy="257" r="97" fill="url(#dxLens)" stroke="#2B323B" strokeWidth="10"/>
    <circle className="dx-lens-lit" cx="501" cy="257" r="92" fill="url(#dxActivated)" opacity="0"/>
    <path d="M453 205Q482 182 514 191" fill="none" stroke="#FFFFFF" strokeWidth="8" opacity=".06" strokeLinecap="round"/>
    <circle cx="501" cy="110" r="22" fill="#0B1017" stroke="#B8BEC8" strokeWidth="5"/>
    <circle cx="501" cy="110" r="15" fill="url(#dxGreen)"/>
    {symbols.map((t,i)=><use key={i} href="#dxIcon" x={t.x} y={t.y} transform={"rotate("+t.r+" "+t.x+" "+t.y+")"}/>)}
    <path d="M501 411L521 437L501 445L481 437Z" fill="#15161A"/>
   </g>
   <g className="dx-lens-scanner"><circle cx="501" cy="257" r="63" fill="none" stroke="#FF4FAD" strokeWidth="4"/><path d="M475 235V279M487 211V302M501 204V309M515 213V302M527 236V277" stroke="#FFD5EC" strokeWidth="8" strokeLinecap="round"/></g>
   <g className="dx-guides">
    <path d="M355 167L332 179M645 167L668 179" stroke="#FF4CA6" strokeWidth="5"/>
   </g>
  </svg>
 </div>;
}
