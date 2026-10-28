'use strict';
// Local SVG props keep exact educational distinctions crisp at small sizes; no target script is drawn.
const LULU_OBJECTS={
 book:'<path d="M24 13h62v92H24q-12-3-12-12V25q0-12 12-12Z" fill="#b9d6bb"/><path d="M25 15v78h62M25 94q-10 0-10 8h72" fill="#fff8e7"/><path d="M37 34h34"/>',
 dictionary:'<path d="M20 12h75v94H20Q8 100 8 89V25Q8 12 20 12Z" fill="#c8b7df"/><path d="M20 14v79h75M20 94Q8 94 10 104h85" fill="#fff8e7"/><path d="M89 29h14v14H89m0 9h14v14H89m0 9h14v14H89" fill="#f2c87b"/><circle cx="56" cy="47" r="15" fill="#f5edfa"/><path d="m66 59 13 14"/>',
 magazine:'<path d="M20 15h78v91H20Z" fill="#f3b7bf"/><path d="M31 28h56"/><rect x="33" y="40" width="50" height="41" rx="2" fill="#fff2d3"/><circle cx="58" cy="55" r="8" fill="#c5addc"/><path d="M43 78q15-24 30 0M32 94h52"/>',
 newspaper:'<path d="M9 23h99v75H9Z" fill="#f4eee8"/><path d="M19 36h79M46 49v38m29-38v38m-56-35h17m-17 12h17m-17 12h17m19-24h12m-12 12h12m-12 12h12m19-24h12m-12 12h12m-12 12h12"/>',
 notebook:'<rect x="25" y="13" width="70" height="94" rx="4" fill="#a8d4e0"/><path d="M39 15v89m14-66h28m-28 16h28m-28 16h28m-28 16h28" stroke="#fff8ed"/><path d="M16 25h19m-19 18h19m-19 18h19m-19 18h19m-19 18h19"/>',
 organiser:'<rect x="20" y="12" width="78" height="96" rx="8" fill="#c998aa"/><path d="M35 15v90"/><path d="M75 47h31v25H75Z" fill="#f7d792"/><circle cx="89" cy="59" r="4"/>',
 pencil:'<path d="m20 98 8-27L83 10l18 17-56 61Z" fill="#f1c66e"/><path d="m28 71 17 17-25 10Z" fill="#fff1cd"/><path d="m20 98 9-3-6-6Z" fill="#6d5147"/><path d="m77 18 18 17M38 72l47-50"/>',
 ballpoint:'<path d="m31 98 5-26 43-58 16 12-43 58Z" fill="#9ccae5"/><path d="m76 18-12-9-26 35" fill="none"/><path d="m36 72 16 12m-21 14 5-12"/>',
 mechanical:'<path d="m27 102 9-28 44-66 13 9-44 66Z" fill="#e6b0b5"/><path d="m34 78 14 9m-10-16 14 9m-9-17 14 9m27-60 6-8m-17 2 17 11M27 102l-5 8"/><path d="m79 28-10-7-12 17" fill="none"/>',
 card:'<rect x="12" y="25" width="96" height="66" rx="6" fill="#b5cedb"/><path d="M14 44h92"/><circle cx="37" cy="65" r="8" fill="#f9d8c3"/><path d="M56 61h37m-37 15h22"/>',
 namecard:'<rect x="10" y="27" width="100" height="64" rx="4" fill="#fff8e8"/><circle cx="33" cy="54" r="10" fill="#e1b8c4"/><path d="M19 76q14-19 28 0m12-28h37m-37 15h29m-29 15h37"/>',
 key:'<circle cx="40" cy="38" r="24" fill="#f4d078"/><circle cx="40" cy="38" r="8" fill="#fff8e8"/><path d="m55 57 44 43 11-11-10-11-9 9-10-10 8-8-11-11" fill="#f4d078"/>',
 watch:'<path d="M39 5h40l-4 27H43Zm4 84h32l4 26H39Z" fill="#c3abd7"/><circle cx="59" cy="60" r="34" fill="#fff8e7"/><path d="M59 37v25l16 10" fill="none"/>',
 umbrella:'<path d="M8 58q50-85 104 0-17-12-34 0-18-12-35 0-17-12-35 0Z" fill="#a9cfd6"/><path d="M60 22v74q0 23 20 13" fill="none"/>',
 bag:'<rect x="15" y="36" width="90" height="70" rx="12" fill="#d2a8b8"/><path d="M36 38V26q25-36 49 0v12M17 63h86m-50-4v18h18V59" fill="none"/>',
 cd:'<circle cx="60" cy="60" r="48" fill="#c9d9e1"/><circle cx="60" cy="60" r="12" fill="#fff8e7"/><path d="m29 29 18 17m26 27 18 17M29 51l17 5m28 8 17 5" stroke="#fff9f3"/>',
 tv:'<rect x="8" y="18" width="104" height="73" rx="8" fill="#a7baca"/><rect x="18" y="28" width="71" height="52" rx="3" fill="#e0ede3"/><circle cx="101" cy="42" r="4"/><path d="m47 91-8 15m34-15 8 15m-40-88-9-12m9 12 14-12"/>',
 radio:'<rect x="9" y="33" width="102" height="66" rx="10" fill="#e8bf80"/><path d="m24 34 60-26"/><circle cx="38" cy="67" r="22" fill="#b3c4c6"/><path d="M24 57h28M24 68h28m-28 11h28m21-29h26m-26 12h26"/><circle cx="83" cy="83" r="8" fill="#fff4dd"/>',
 camera:'<path d="M15 34h22l9-15h32l10 15h18v64H15Z" fill="#aebbc9"/><circle cx="61" cy="65" r="25" fill="#b3d1d9"/><circle cx="61" cy="65" r="12" fill="#e8f5f0"/><path d="M20 25h13m56 22h10"/>',
 computer:'<rect x="20" y="12" width="80" height="66" rx="4" fill="#b4c8d9"/><rect x="28" y="21" width="64" height="45" fill="#e4eee7"/><path d="M9 79h102l-8 25H17Z" fill="#cad4de"/><path d="M47 88h27"/>',
 desk:'<path d="M8 35h104v17H8Zm12 17v56m80-56v56M68 52v37h32m-31-18h31" fill="#d5b795"/><path d="M79 63h10"/>',
 chair:'<path d="M31 13h58v48H31Zm-8 50h75v16H23Zm9 16v29m57-29v29" fill="#c6b5d5"/>',
 shoes:'<path d="M8 58q24 10 27-23l17 6 5 40H8ZM65 58q22 9 24-22l18 6 5 39H65Z" fill="#bd9f9d"/><path d="M9 83h48m8 0h47M30 56l17 3m36-3 16 3"/>',
 tie:'<path d="M43 10h34L68 33l20 58-28 20-28-20 20-58Z" fill="#8db9d9"/><path d="m44 12 16 14 16-14M52 34h16"/>',
 phone:'<rect x="10" y="44" width="100" height="61" rx="14" fill="#d5b5ca"/><path d="M18 45q-3-44 25-27l5 12-9 8q23 17 42 0l-9-8 6-12q27-16 26 27" fill="#c0a2c0"/><circle cx="60" cy="73" r="18" fill="#fff7e1"/>',
 vending:'<rect x="21" y="5" width="78" height="109" rx="5" fill="#b2ceda"/><rect x="31" y="16" width="47" height="65" rx="3" fill="#f5f0db"/><path d="M37 29h9v16h-9Zm18 0h9v16h-9ZM37 54h9v16h-9Zm18 0h9v16h-9Z" fill="#c5abdb"/><path d="M84 27h8m-8 12h8m-52 54h42v12H40"/>',
 photo:'<path d="M15 18h90v86H15Z" fill="#fff4dd"/><path d="m25 83 23-29 19 18 15-16 15 27Z" fill="#a2c7bb"/><circle cx="81" cy="39" r="10" fill="#f4cc6b"/>',
 letter:'<rect x="9" y="28" width="102" height="70" rx="4" fill="#fff5df"/><path d="m11 31 49 37 49-37M12 94l32-31m64 31L76 63" fill="none"/>',
 video:'<rect x="9" y="28" width="103" height="64" rx="5" fill="#bac3cf"/><rect x="23" y="41" width="75" height="24" fill="#fff3dd"/><circle cx="36" cy="53" r="8"/><circle cx="83" cy="53" r="8"/><path d="M37 81h46"/>',
 cigarette:'<path d="m18 93 74-54 12 16-74 54Z" fill="#fff1dc"/><path d="m76 51 12 16m-54 18 12 16"/><path d="M90 31q-13-12 0-23" fill="none"/>',
 chocolate:'<path d="M18 12h84v96H18Z" fill="#bb8b77"/><path d="M22 39h76M22 68h76M46 16v87m27-87v87"/><path d="m15 75 93-10v46H15Z" fill="#d7b3cb"/>',
 rice:'<path d="M13 56q49-43 94 0" fill="#fff8e8"/><path d="M11 58h98q-8 44-48 44T11 58Z" fill="#c5b5d9"/><path d="M33 46l7-8m15 6 5-8m15 9 3-7"/>',
 coffee:'<path d="M23 36h61v48q-29 24-61 0Z" fill="#ecdac0"/><path d="M84 43q35-4 24 26-8 11-24 5" fill="none"/><ellipse cx="53" cy="36" rx="30" ry="9" fill="#a47760"/><path d="M14 102h85M43 20q-9-10 0-17m18 17q-9-10 0-17" fill="none"/>',
 tea:'<path d="M20 45q7-26 40-25 35-1 37 36l15-18 1 29-17 5q-6 30-42 28-36-1-34-55Z" fill="#b9cfb4"/><path d="M20 43q-29-11-15 25l18 6M40 23h36m-18-5V9" fill="none"/>',
 blacktea:'<path d="M23 35h63v51q-31 22-63 0Z" fill="#f5d59c"/><path d="M86 44q32-8 22 24-7 11-22 8M56 37v23l18 9v19H54V69l2-9" fill="none"/><path d="M13 103h87"/>',
 wine:'<path d="M30 12h60l-5 44q-26 33-50 0Z" fill="#f6e7e4"/><path d="M33 40h54l-3 16q-24 24-49 0Z" fill="#d68f9e"/><path d="M60 75v30m-25 3h50"/>',
 sake:'<path d="M27 7h19v30l13 17v55H13V54l14-17Z" fill="#c4d2ba"/><path d="M19 74h34v24H19" fill="#fff4dd"/><path d="M72 73h35l-5 28H77Z" fill="#f4dfd0"/>',
 milk:'<path d="m35 7 38 0 18 21v80H20V29Z" fill="#fff7eb"/><path d="M20 30h71M36 9v20m37-21v20M23 49h65v41H23" fill="#b3d4e0"/>',
 water:'<path d="M25 15h70l-8 94H33Z" fill="#eff6ed"/><path d="m29 59 63-2-5 52H33Z" fill="#b1d7e6"/><path d="m39 31 2 13m37 36-3 12" stroke="#fffef9"/>',
 juice:'<path d="M28 28h66l-8 81H36Z" fill="#f8d18b"/><path d="m57 70 9-59h31" fill="none"/><circle cx="24" cy="83" r="20" fill="#f4bc67"/><path d="M24 65v34M7 83h35m-30-12 24 24m-24 0 24-24" stroke="#fff3d0"/>',
 beer:'<path d="M26 32h61v74H26Z" fill="#f3ca7b"/><path d="M87 47h22v40H87" fill="none"/><path d="M25 36q-12-19 4-20 4-16 20-9 13-11 24 1 20-7 21 13l-8 15Z" fill="#fff9ec"/><path d="M43 53v35m25-35v35"/>',
 fruit:'<path d="M8 59h102l-15 49H23Z" fill="#dcc29a"/><circle cx="37" cy="45" r="25" fill="#e7ac9c"/><circle cx="78" cy="44" r="25" fill="#f2c36c"/><path d="m39 21 2-14m2 14q15-15 22-4" fill="#a9c3a2"/>',
 fish:'<path d="M88 60q-40-57-81 0 41 57 81 0l24 23V36Z" fill="#a5c8cf"/><circle cx="28" cy="55" r="3" fill="#704a36"/><path d="M43 40q-11 21 0 40m16-49 10-18 10 24" fill="none"/>',
 egg:'<path d="M23 78Q18 30 60 8q42 21 37 70-12 48-37 30-26 18-37-30Z" fill="#fff4e0"/>',
 meat:'<path d="M17 36Q47 3 91 20q27 22 9 53-10 38-57 34Q2 97 17 36Z" fill="#dd9a9b"/><path d="M27 43q26-28 56-14 21 16 8 38-10 27-43 29-32-5-21-53Z" fill="#eeb6ac"/><circle cx="62" cy="57" r="13" fill="#fff1d8"/>',
 bread:'<path d="M27 20q31-25 62 0 22 18 5 40v46H24V60Q7 39 27 20Z" fill="#e3ba83"/><path d="M36 34q22-17 43 0 15 13 4 24v38H35V58q-13-13 1-24Z" fill="#fff0c9"/>',
 vegetables:'<path d="m45 37 19 14-38 60Z" fill="#eab47b"/><path d="m46 38-9-25m14 26 6-32m-6 31 20-24" stroke="#94b699"/><circle cx="88" cy="78" r="27" fill="#b4ceb1"/><path d="M86 52q-15 23 0 51m14-45Q80 80 109 88" fill="none"/>',
 car:'<path d="m23 35 18-22h37l21 22 13 8v45H8V45Z" fill="#b4ccd8"/><path d="M36 21h38l15 19H23Z" fill="#f5eee2"/><circle cx="30" cy="90" r="12" fill="#c7b4bc"/><circle cx="91" cy="90" r="12" fill="#c7b4bc"/><path d="M17 58h13m61 0h13"/>',
 bus:'<rect x="11" y="15" width="99" height="79" rx="12" fill="#e7c590"/><path d="M19 28h82v31H19Zm27 0v31m29-31v31m14 9v22" fill="#d6e6e5"/><circle cx="32" cy="96" r="11" fill="#c5b5bd"/><circle cx="88" cy="96" r="11" fill="#c5b5bd"/>',
 train:'<rect x="24" y="7" width="72" height="90" rx="18" fill="#b7cdd8"/><rect x="34" y="22" width="51" height="31" rx="4" fill="#e8f1e7"/><circle cx="40" cy="72" r="6" fill="#f6db91"/><circle cx="80" cy="72" r="6" fill="#f6db91"/><path d="M21 112h78M38 95l-11 20m55-20 11 20M56 10V2"/>',
 bicycle:'<circle cx="27" cy="83" r="23" fill="#fff5e4"/><circle cx="94" cy="83" r="23" fill="#fff5e4"/><path d="m27 83 26-38 23 38H27l12-47h19m18 47 5-56h-13m13 0h12" fill="none"/>',
 airplane:'<path d="M54 8q7-11 13 0l3 34 43 25v12L69 65l-1 30 17 12v8l-25-6-25 6v-8l17-12-1-30L7 79V67l43-25Z" fill="#c5d9df"/>',
 ship:'<path d="M13 67h98l-19 33H32Z" fill="#b4cddd"/><path d="M31 67V43h55v24M46 43V16h24v27" fill="#fff2db"/><path d="M8 110q16-12 31 0 17-12 32 0 17-12 39 0" fill="none"/>',
 school:'<path d="M12 44h96v66H12Zm28-25h40v91H40Z" fill="#e6c29b"/><path d="m31 23 29-17 29 17" fill="#dfad9e"/><circle cx="60" cy="40" r="11" fill="#fff4db"/><path d="M60 33v8h6M52 82h16v28M22 60h8m-8 18h8m60-18h8m-8 18h8"/>',
 company:'<path d="M20 9h80v101H20Z" fill="#b7d0d9"/><path d="M30 24h13v13H30Zm26 0h13v13H56Zm26 0h8v13h-8ZM30 53h13v13H30Zm26 0h13v13H56Zm26 0h8v13h-8ZM48 88h25v22" fill="#fff4dc"/>',
 hospital:'<path d="M15 31h90v79H15Zm25-22h41v35H40Z" fill="#f2d7d0"/><path d="M55 15h12v8h8v12h-8v8H55v-8h-8V23h8Z" fill="#ca94a2" stroke="none"/><path d="M44 79h32v31M25 53h13m-13 14h13m43-14h13m-13 14h13"/>',
 bank:'<path d="m8 35 52-27 52 27ZM12 96h96v15H12Z" fill="#d7c0b0"/><path d="M23 40h15v56H23Zm30 0h15v56H53Zm30 0h15v56H83Z" fill="#fff1d8"/><circle cx="60" cy="24" r="6" fill="#f6d579"/>',
 home:'<path d="m5 52 55-43 55 43-14 10-41-33-40 33Z" fill="#d5b3c8"/><path d="M20 55v56h81V55M48 75h25v36M29 66h11v16H29Z" fill="#f4e5c9"/>',
 shop:'<path d="M16 37h88v74H16Z" fill="#dce5d0"/><path d="M16 13h88l10 27q-14 17-28 0-15 17-29 0-15 17-29 0-14 17-22 0Z" fill="#d8b5c9"/><path d="M22 59h38v30H22Zm52-5h22v57" fill="#faf1df"/>',
 toilet:'<path d="M24 10h67v35H24Z" fill="#f3eee9"/><path d="M17 48h87q-4 35-35 35v25H42V83Q20 78 17 48Z" fill="#e7dce7"/><ellipse cx="61" cy="49" rx="43" ry="11" fill="#fff8ec"/>',
 stairs:'<path d="M11 107V86h23V63h23V40h23V16h28v91Z" fill="#cbbbd9"/><path d="m12 54 58-46m-3 1-3 15m3-15-17 2" fill="none"/>',
 elevator:'<rect x="14" y="26" width="92" height="85" rx="4" fill="#c3d4dc"/><path d="M25 108V38h70v70M60 39v69M33 15l9-9 9 9m18-9 9 9 9-9" fill="none"/>',
 escalator:'<path d="m10 83 20 0 50-52h28v17H88L38 101H10Z" fill="#b7cfcf"/><path d="m10 66 20 0 50-52h28m-73 67 10 9m5-24 10 9m4-24 11 9" fill="none"/>',
 room:'<path d="M15 10h90v103H15Z" fill="#e3d0b4"/><path d="M29 24h62v89H29Z" fill="#f3e4ce"/><circle cx="78" cy="76" r="4"/>',
 classroom:'<rect x="14" y="9" width="93" height="48" rx="4" fill="#b0c8b1"/><path d="M8 79h42v11H8Zm62 0h42v11H70ZM16 91v20m27-20v20m35-20v20m27-20v20M20 60v11m80-11v11"/>',
 meeting:'<ellipse cx="60" cy="63" rx="44" ry="22" fill="#d8bd9d"/><path d="M30 80v30m60-30v30"/><rect x="40" y="9" width="40" height="22" rx="6" fill="#c0b2d1"/><path d="M42 98h36M10 49v31m101-31v31"/>',
 lobby:'<path d="M21 48q-12-36 7-36h63q19 0 8 36" fill="#c9b5d0"/><path d="M10 40q16-13 22 3v27h56V43q8-17 22-3v49H10Z" fill="#d9c7dc"/><path d="M21 89v20m78-20v20M32 49h56"/>',
 reception:'<path d="M10 53h100v55H10Z" fill="#dcc29d"/><path d="M43 49q0-29 34 0Zm16-16v-9m-8 0h16" fill="#f4d27f"/>',
 garden:'<path d="M9 69h102m-90-11v51m26-51v51m26-51v51m26-51v51M60 56V18" fill="none"/><circle cx="60" cy="18" r="12" fill="#ebb5c0"/><path d="M56 43Q28 19 31 50q13 13 25 7m8-14q27-24 25 7-13 13-25 7" fill="#a9c4a1"/>',
 globe:'<circle cx="60" cy="53" r="43" fill="#b8d9e5"/><path d="m30 22 27-9 17 18-12 13 9 14-20 13-5 23-20-22 5-18-12-10m61-15 19 14-6 26-16-7-6-17Z" fill="#abc7a5" stroke-width="2"/><path d="M50 97v15m-18 0h56"/>',
 gift:'<path d="M17 48h87v62H17Zm-5-18h97v23H12Z" fill="#f1d28e"/><path d="M51 31h19v79H51Z" fill="#d6a2b4"/><path d="M60 30Q11 8 35 4q19-2 25 26Q71-6 91 7q17 12-31 23Z" fill="#d6a2b4"/>',
 flower:'<path d="M60 52v61m0-36Q30 56 34 84q13 11 26 5m0-14q30-19 26 9-11 11-26 5" fill="#a9c5a7"/><path d="M60 13q25-23 27 3 31 1 13 24 12 28-18 26-19 25-31 0-32 3-24-25-20-23 10-26 0-28 23-2Z" fill="#e8b2c0"/><circle cx="63" cy="39" r="15" fill="#f5d37c"/>',
 football:'<circle cx="60" cy="60" r="48" fill="#f7f0e5"/><path d="m60 35 22 16-8 25H47l-9-25Z" fill="#b8b2bb"/><path d="m60 12 0 23M14 45l24 6m8 25-16 24m44-24 16 24m-8-49 23-6"/>',
 tennis:'<ellipse cx="48" cy="44" rx="28" ry="40" transform="rotate(28 48 44)" fill="#e5d7e7"/><path d="m28 30 34 20m-38-7 32 18m-33-8 25 16m6-53L28 61m37-33L40 76m25-8 40 39-12 10-39-40" fill="none"/><circle cx="95" cy="34" r="17" fill="#d5dba7"/>',
 clock:'<circle cx="60" cy="60" r="47" fill="#fff6df"/><path d="M60 26v36l22 15M60 14v5m46 41h-5M60 106v-5M14 60h5"/>',
 calendar:'<rect x="13" y="19" width="95" height="91" rx="7" fill="#fff3df"/><path d="M13 42h95M34 7v23M84 7v23M30 61h7m20 0h7m20 0h7M30 81h7m20 0h7m20 0h7"/><path d="M16 23h89v16H16Z" fill="#d8b0c9" stroke="none"/>',
 moon:'<path d="M83 12Q41 18 61 62q12 25 40 20-47 49-78 8-40-53 20-79 20-7 40 1Z" fill="#f3d48d"/>',
 sun:'<circle cx="60" cy="60" r="28" fill="#f4d481"/><path d="M60 3v18m0 78v18M3 60h18m78 0h18M18 18l13 13m58 58 13 13M18 102l13-13m58-58 13-13"/>',
 flag:'<path d="M27 113V8m0 4h72l-8 27 8 27H27" fill="#d7b6cc"/>',
 badge:'<rect x="18" y="28" width="88" height="74" rx="8" fill="#fff3d8"/><path d="M39 29V8h45v21" fill="none"/><circle cx="45" cy="58" r="11" fill="#efc4b8"/><path d="M31 84q14-19 28 0m11-30h24m-24 15h24"/>',
 finish:'<path d="M27 111V10m0 4h77l-13 23 13 22H27" fill="#e4d3ea"/><path d="M27 14h19v22H27m19 0h19v22H46m19-44h19v22H65m19 0h19v22H84" fill="#a8bdc8"/>',
 flask:'<path d="M43 8h35M48 10v32l-31 53q-9 15 11 17h68q19-1 10-17L73 42V10" fill="#d8e5e4"/><path d="m31 78 61 0 16 24-12 10H28l-11-11Z" fill="#bdcbb2"/><circle cx="57" cy="70" r="5"/>',
 bow:'<path d="M22 44q38 25 76 0M60 20v66m-25-8 25 25 25-25" fill="none"/>',
 pause:'<rect x="27" y="20" width="23" height="80" rx="5" fill="#c7b6d6"/><rect x="70" y="20" width="23" height="80" rx="5" fill="#c7b6d6"/>'
};
Object.assign(LULU_OBJECTS,{taxi:LULU_OBJECTS.car+'<path d="M47 12V3h26v9" fill="#f2cf78"/>',subway:LULU_OBJECTS.train+'<path d="M5 110V49q0-61 55-45 56-16 55 45v61" fill="none" stroke="#b4a4bb" stroke-width="7"/>',express:LULU_OBJECTS.train+'<path d="M2 31h17M2 48h17m-17 17h17"/>',limited:LULU_OBJECTS.train+'<path d="M1 22h20M1 40h20M1 58h20M1 76h20"/>',shinkansen:'<path d="M9 87q-7-31 52-48l29-23h22v79H9Z" fill="#d2e0e6"/><path d="m58 40 31-21 5 28H44M17 75h91M30 103h69" fill="#a7c4d5"/>',university:LULU_OBJECTS.school+'<path d="m18 19 42-15 41 15-41 15Z" fill="#c2aed5"/>',library:LULU_OBJECTS.company+'<path d="M25 51h32v26H25Zm33 0h32v26H58Z" fill="#e8caa3"/>',museum:LULU_OBJECTS.bank+'<rect x="43" y="46" width="36" height="40" fill="#c3b1d8"/><circle cx="62" cy="60" r="6" fill="#f2dba4"/>',department:LULU_OBJECTS.company+'<path d="M24 42h72M24 75h72" stroke="#a990a7"/>',supermarket:LULU_OBJECTS.shop+'<path d="M30 57h43l-5 26H37l-7-33h-9" fill="none"/><circle cx="42" cy="94" r="4"/><circle cx="65" cy="94" r="4"/>',cafeteria:LULU_OBJECTS.rice+'<path d="M109 8v29m-9-29v20h18V8M10 7v28m0 0v15" fill="none"/>',sales:LULU_OBJECTS.reception+'<path d="M27 30q20 8 22-18l15 6 4 25H27" fill="#c9b6d2"/>',basement:LULU_OBJECTS.company+'<path d="M4 65h112m-4 26H97m9-7-9 7 9 7" stroke="#b37874" stroke-width="6"/>',homework:LULU_OBJECTS.notebook,report:LULU_OBJECTS.letter});
function luluObjectMarkup(key){if(!LULU_OBJECTS[key])throw Error('Unknown teaching object '+key);return `<g stroke="#925b38" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${LULU_OBJECTS[key]}</g>`;}
function luluObject(key,x=0,y=0,size=120){return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">${luluObjectMarkup(key)}</svg>`;}
Object.assign(LULU_OBJECTS,{postoffice:LULU_OBJECTS.shop+'<path d="M36 59h49v31H36Zm0 1 25 17 24-17" fill="#f9ebd7"/>',station:LULU_OBJECTS.train+'<path d="M3 15h114m-105 0v95m100-95v95" fill="none"/>',test:LULU_OBJECTS.notebook+'<path d="m50 41 5 6 10-13m-15 27 5 6 10-13m-15 27 5 6 10-13" fill="none"/>',cake:'<path d="M15 52h90v57H15Z" fill="#e9b6c0"/><path d="M15 58q12 20 23 0 11 20 22 0 11 20 22 0 11 20 23 0M33 51V29m27 22V20m27 31V29" fill="none"/><path d="M28 21q5-19 10 0m17-9q5-19 10 0m17 9q5-19 10 0" fill="#f1cb78"/>',ear:'<path d="M34 92Q-3 16 57 12q55 2 31 50-12 25-34 14-4 38-20 16Z" fill="#f5c6b9"/><path d="M36 58q-14-34 16-31 23 3 10 22-19-10-16 13" fill="none"/>'});
function luluDiagramText(text,x,y,size=16){return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="#704832" font-family="sans-serif">${esc(text)}</text>`;}
function luluPairScene(pose='speaking',purpose='meeting'){
 const prop=purpose==='offering'?'gift':purpose==='attention'?'search':purpose==='thanks'?'gift':null;
 return `${luluScenePerson(90,107,1.35,'speaker',pose)}${luluScenePerson(300,107,1.35,'listener',purpose==='thanks'?'bow':'speaking')}${prop?luluObject(prop==='search'?'badge':prop,162,67,63):''}<path d="M141 42q60-32 111 0" fill="none" stroke="#af95c3" stroke-width="4" stroke-dasharray="6 6"/>${luluDiagramText(state.language==='zh-Hant'?'說話者':'Speaker',90,193,18)}${luluDiagramText(state.language==='zh-Hant'?'聽者':'Listener',300,193,18)}`;
}
function luluSpatialScene(location='speaker',object='book',modifier=false){
 const x=location==='speaker'?135:location==='listener'?265:200,y=location==='far'?12:95;
 return `<rect x="2" y="2" width="396" height="222" rx="20" fill="#fff5e3"/><path d="M18 69h364" stroke="#d8c9b1" stroke-dasharray="5 5"/><ellipse cx="${x+26}" cy="${y+35}" rx="49" ry="37" fill="#f8e4a5"/>${luluObject(object,x-5,y-4,65)}${luluScenePerson(58,140,1.1,'speaker','point')}${luluScenePerson(342,140,1.1,'listener','point')}<path d="M94 127Q${x} 78 ${x+20} ${y+36}" fill="none" stroke="#8d76ab" stroke-width="3" stroke-dasharray="5 5"/>${luluDiagramText(state.language==='zh-Hant'?'說話者':'Speaker',58,216,18)}${luluDiagramText(state.language==='zh-Hant'?'聽者':'Listener',342,216,18)}${modifier?'<rect x="279" y="11" width="89" height="32" rx="7" fill="#e9def1"/>':''}${modifier?luluDiagramText('… + noun',323,33,13):''}`;
}
function luluActionScene(action){
 const single=(pose,object)=>`<foreignObject x="15" y="12" width="190" height="175">${luluSprite(pose)}</foreignObject>${object?luluObject(object,240,44,125):''}`;
 if(action==='writing')return single('student','pencil');
 if(action==='reading')return single('reading','book');
 if(['listening','watching','photographing','smoking','finishing','resting'].includes(action))return `<foreignObject x="30" y="3" width="340" height="210">${luluSprite(action)}</foreignObject>`;
 if(action==='doing')return single('student','homework');
 if(action==='meeting')return luluPairScene('wave');
 if(action==='buying')return `${luluScenePerson(65,105,1.15,'speaker','point')}${luluScenePerson(337,105,1.15,'listener','gift')}${luluObject('shop',158,3,85)}${luluObject('bag',152,97,64)}<path d="M126 71h137m-12-9 12 9-12 9M266 160H128m12-9-12 9 12 9" fill="none" stroke="#8d76ab" stroke-width="4"/>${luluDiagramText('¥',196,68,24)}${luluDiagramText(state.language==='zh-Hant'?'顧客':'Customer',65,196,15)}${luluDiagramText(state.language==='zh-Hant'?'店員':'Shop assistant',337,196,15)}`;
 if(['going','returning','coming'].includes(action))return `${luluObject(action==='returning'?'school':'home',4,26,100)}<foreignObject x="120" y="25" width="150" height="150">${luluSprite('walking')}</foreignObject>${action==='coming'?luluScenePerson(345,100,.9,'listener','wave'):luluObject(action==='returning'?'home':'school',292,26,100)}<path d="M110 173h179m-14-9 14 9-14 9" fill="none" stroke="#8d76ab" stroke-width="4"/>`;
 throw Error('Unknown action '+action);
}
function luluContextScene(plan,word){
 const c=plan.context,person=(x=85,pose='point')=>luluScenePerson(x,110,1.3,'speaker',pose),obj=key=>luluObject(key,235,35,140),text=(label,x=300,y=198)=>luluDiagramText(label,x,y,16);
 if(c==='family')return `${luluScenePerson(85,90,1.2,'speaker','wave')}${luluScenePerson(205,110,.85,'listener','wave')}${luluScenePerson(315,90,1.2,'listener','wave')}`;
 if(c==='together')return `${luluScenePerson(90,107,1.3,'speaker','reading')}${luluScenePerson(300,107,1.3,'listener','reading')}<path d="M90 182v13h210v-13" fill="none" stroke="#af95c3" stroke-width="3"/>`;
 if(['person','address','alone','languages'].includes(c))return c==='alone'?person(200,'reading'):luluPairScene(c==='address'?'bow':'speaking',c==='languages'?'attention':'meeting');
 if(c==='souvenir')return person(90,'gift')+obj('gift')+luluObject('globe',235,6,60);
 if(c==='country'||c==='named-place')return person()+obj(plan.object||'globe')+(plan.object!=='globe'?luluObject('globe',196,3,60):'');
 if(c==='platform')return person()+obj('train')+text('1  |  2  |  3');
 if(c==='origin')return person()+obj('globe')+'<path d="M256 173H133m12-9-12 9 12 9" stroke="#8d76ab" stroke-width="4" fill="none"/>';
 if(c==='small')return person()+obj('water')+'<path d="M266 163h55" stroke="#8d76ab" stroke-width="6"/>';
 if(c==='meeting')return person()+obj('meeting');
 if(c==='film')return person()+obj('video');
 if(c==='break')return luluActionScene('resting');
 if(c==='meal')return person(88,'point')+obj('rice')+luluObject(plan.period==='night'?'moon':'sun',210,4,60)+text(plan.period==='morning'?'AM':plan.period==='night'?'PM':'12:00',270,207);
 if(c==='counter')return person()+obj(plan.unit==='age'?'cake':plan.unit==='price'?'badge':plan.unit==='floor'?'company':'number-board')+text(plan.unit==='price'?'¥ '+plan.number:plan.unit==='floor'?plan.number+'F':String(plan.number));
 if(['start','end','and','next'].includes(c))return person()+`<g stroke="#925b38" stroke-width="3"><rect x="200" y="42" width="60" height="70" rx="8" fill="${c==='start'?'#c7b4dd':'#fff4df'}"/><rect x="312" y="42" width="60" height="70" rx="8" fill="${c==='end'?'#c7b4dd':'#fff4df'}"/><path d="M262 78h44m-10-8 10 8-10 8" fill="none"/></g>`+text(c==='and'?'+':c==='start'?'START':c==='end'?'END':'NEXT',285,153);
 if(c==='date'||c==='calendar'||c==='weekday')return person()+obj('calendar')+(c==='date'?text(String(plan.number),300,112):c==='weekday'?text(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][plan.day],300,112):text(word.id==='csv-9c2a0dad1676a16c'?'Birthday':'Date'))+(word.id==='csv-9c2a0dad1676a16c'?luluObject('cake',180,126,70):'');
 if(c==='relative')return person()+`<g fill="#fff3dc" stroke="#925b38" stroke-width="3">${[-1,0,1].map((n,i)=>`<rect x="${184+i*67}" y="57" width="56" height="72" rx="6" fill="${n===Math.sign(plan.offset)?'#cab9df':'#fff3dc'}"/>`).join('')}</g>`+text(plan.offset<0?'BEFORE':plan.offset>0?'AFTER':'NOW',282,163);
 if(c==='frequency')return person()+`<g stroke="#925b38" stroke-width="2">${Array.from({length:7},(_,i)=>`<rect x="${185+i*28}" y="67" width="22" height="45" rx="4" fill="${plan.all||i===1||i===5?'#c8b5dc':'#fff4df'}"/>`).join('')}</g>`+text(plan.all?'Every day':'Sometimes',283,155)+(plan.period?luluObject(plan.period==='night'?'moon':'sun',282,2,50):'');
 if(c==='morning'||c==='night')return `<foreignObject x="25" y="14" width="195" height="173">${luluSprite(c==='morning'?'waking':'sleeping')}</foreignObject>${obj(c==='morning'?'sun':'moon')}`;
 if(c==='clock')return person()+obj('clock')+text(word.id==='4-15'?'3:30':word.id==='4-14a'?'0:02':word.id==='4-14b'?'0:01':'2:00');
 if(c==='question'){
  const key=plan.object||'book';let target=key==='person'?luluScenePerson(300,96,1,'listener','idle'):key==='many'?luluObject('book',216,64,66)+luluObject('book',270,64,66)+luluObject('book',324,64,66):key==='price'?obj('badge')+text('¥ ?',300,116):key==='floor'?obj('company')+text('?F',300,161):key==='age'?luluScenePerson(300,105,1,'listener','idle')+luluObject('cake',190,50,70):obj(key);
  return person(75,'speaking')+target+`<text x="190" y="47" font-size="38" fill="#925b38" text-anchor="middle">?</text>`;
 }
 throw Error('Unknown context '+c);
}
function luluWordVisual(word,compact=false){
 const p=LULU_WORD_PLANS[word.id];if(!p)throw Error('Missing word visual plan '+word.id);let content;
 if(p.strategy==='spatial')content=luluSpatialScene(p.location,p.object,p.modifier);
 else if(p.strategy==='action')return `<figure class="vocabulary-visual lulu-word-visual lulu-action-visual" data-word-visual="${word.id}" data-visual-strategy="action" aria-hidden="true">${luluSprite(p.pose)}</figure>`;
 else if(p.strategy==='object')content=`<foreignObject x="5" y="40" width="120" height="125">${luluSprite('point')}</foreignObject>${luluObject(p.object,162,12,180)}`;
 else if(p.strategy==='occupation')content=`${occupationPiggy(word)}${luluObject(p.object,5,35,115)}`;
 else if(p.strategy==='action-context')content=luluActionScene(p.action);
 else if(p.strategy==='conversation')content=luluPairScene(p.pose,p.purpose)+(p.reaction?`<text x="200" y="66" text-anchor="middle" font-size="36" fill="#925b38">${p.reaction}</text>`:'');
 else content=luluContextScene(p,word);
 return `<figure class="vocabulary-visual lulu-word-visual" data-word-visual="${word.id}" data-visual-strategy="${p.strategy}" ${compact?`role="img" aria-label="${esc(word.en)}"`:'aria-hidden="true"'}><svg viewBox="0 0 400 ${p.strategy==='spatial'?226:220}" focusable="false">${content}</svg>${p.strategy==='context'&&['country','named-place','languages'].includes(p.context)?`<figcaption class="lulu-context-caption">${esc(p.meaning)}</figcaption>`:''}</figure>`;
}
LULU_OBJECTS['number-board']='<rect x="9" y="12" width="102" height="82" rx="7" fill="#d5e6df"/><path d="m28 112 12-18m52 18-12-18" stroke="#925b38" stroke-width="4"/><text x="60" y="66" text-anchor="middle" font-family="sans-serif" font-size="36" fill="#704832" stroke="none">123</text>';
LULU_OBJECTS.homework=LULU_OBJECTS.test+'<path d="m77 103 22-40 10 6-22 40Z" fill="#e9c071" stroke="#925b38" stroke-width="3"/>';
LULU_OBJECTS.report='<g stroke="#925b38" stroke-width="4"><path d="M32 9h71v92H32Z" fill="#d8c4de"/><path d="M18 19h71v92H18Z" fill="#fff7e6"/><path d="M30 36h47M30 48h36"/><path d="M32 94V76h9v18Zm18 0V61h9v33Zm18 0V70h9v24Z" fill="#adc9c5"/></g>';
