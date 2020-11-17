import { Button, useMediaQuery } from '@chakra-ui/core'
import { motion } from 'framer-motion'

const MotionButton = motion.custom(Button)

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 300, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 300 }
        }
    }
};

const NavButton = (props) => {
    const [isMobile] = useMediaQuery('(max-width: 30em)')
    return (
        <MotionButton
            size="sm"
            variant="ghost"
            width="100%"
            justifyContent="flex-start"
            alignItems="center"
            variants={isMobile ? variants : {}}
            {...props}
        />
    )
}

export default NavButton
