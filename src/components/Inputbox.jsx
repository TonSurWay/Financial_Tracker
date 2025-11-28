import { motion } from 'framer-motion';

function Inputbox({type, name, value, placeholder, onChange, label, variants , errormsg}) {
    
  return (
    <motion.div className='w-full h-26 flex flex-col gap-2' variants={variants} initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, ease: "easeOut" }}>
        <label className='text-sm font-medium'>{label}</label>
        <input className='w-full h-12 border-2 rounded-md border-gray-500 outline-0 px-3 py-2 focus-within:border-black' type={type} name={name} value={value} placeholder={placeholder} onChange={onChange}/>
        {errormsg && <p className='text-red-500 text-sm font-medium'>{errormsg}</p>}
    </motion.div>
  )
}

export default Inputbox