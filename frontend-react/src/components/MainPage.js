import React, { useState } from 'react'
import Navbar from './Navbar'
import {ThemeProvider} from 'styled-components'
import {GlobalStyles} from './styling/globalStyles'
import {lightTheme, darkTheme} from './styling/Themes'

function MainPage(props) {
    const [theme, setTheme] = useState('light')
    return <div>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}><>
            <GlobalStyles/>
            <Navbar setTheme={setTheme} />
            </>
        </ThemeProvider>
    </div>
}

export default MainPage