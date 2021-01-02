import React from 'react'
import './styles.scss'
import useNeomemData from 'hooks/useNeomemData'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import logo from 'assets/logo256.png'

export default function App() {
  const data = useNeomemData()
  return (
    <div className="app">
      <div className="header">
        <span className="logo">
          <img src={logo} alt="logo" />
          <span>Neomem</span>
        </span>
      </div>
      <div className="header-contents">
        <div className="navigation">
          {data.nodes.map(node => (
            <p key={node.name}>{node.name}</p>
          ))}
        </div>
        <div className="navigation-contents">
          <div className="tabs">
            <Tabs>
              <TabList>
                <Tab>
                  Home <span className="close">x</span>
                </Tab>
                <Tab>
                  Projects <span className="close">x</span>
                </Tab>
                <Tab>
                  Fishes <span className="close">x</span>
                </Tab>
                <Tab>+</Tab>
              </TabList>

              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
            </Tabs>
          </div>
          <div className="console">Console</div>
        </div>
      </div>
      <div className="footer">Footer</div>
    </div>
  )
}
