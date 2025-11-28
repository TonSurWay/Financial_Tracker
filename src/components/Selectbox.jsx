import { motion } from 'framer-motion';


function Selectbox({ name, value, onChange, label, options, variants, errormsg }) {

  return (
    <motion.div className='w-full h-26 flex flex-col gap-2' variants={variants} initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, ease: "easeOut" }}>
        <label className='text-sm font-medium'>{label}</label>
        <select className="w-full h-12 border-2 rounded-md border-gray-500 px-3 py-2 focus-within:border-black" name={name}  value={value} onChange={onChange} >
            {options && options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
        {errormsg && <p className='text-red-500 text-xs font-medium'>{errormsg}</p>}
    </motion.div>
  )
}

export default Selectbox