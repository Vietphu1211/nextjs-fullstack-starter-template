import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  const color = "#F6821F"
  return (
    <div className='fixed h-[100vh] w-[100vw] inset-0 flex flex-col items-center justify-center gap-5 bg-white z-50
    '>
      <p className="text-7xl font-bold text-secondary">
          TOLOCO
        </p>
      
      <div>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 24 24"><circle cx={12} cy={2} r={0} fill={color}><animate attributeName="r" begin={0} calcMode="spline" dur="0.7s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill={color} transform="rotate(45 12 12)"><animate attributeName="r" begin="0.087s" calcMode="spline" dur="0.7s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill={color} transform="rotate(90 12 12)"><animate attributeName="r" begin="0.175s" calcMode="spline" dur="0.7s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill={color} transform="rotate(135 12 12)"><animate attributeName="r" begin="0.262s" calcMode="spline" dur="0.7s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill={color} transform="rotate(180 12 12)"><animate attributeName="r" begin="0.35s" calcMode="spline" dur="0.7s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill={color} transform="rotate(225 12 12)"><animate attributeName="r" begin="0.438s" calcMode="spline" dur="0.7s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill={color} transform="rotate(270 12 12)"><animate attributeName="r" begin="0.525s" calcMode="spline" dur="0.7s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={2} r={0} fill={color} transform="rotate(315 12 12)"><animate attributeName="r" begin="0.612s" calcMode="spline" dur="0.7s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg> */}

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#34E0A1" stroke="#34E0A1" strokeWidth="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#34E0A1" stroke="#34E0A1" strokeWidth="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#34E0A1" stroke="#34E0A1" strokeWidth="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
      </div>
    </div>
  )
}

