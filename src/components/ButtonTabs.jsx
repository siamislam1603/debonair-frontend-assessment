import {Tab, Tabs, styled} from '@mui/material'

const ButtonTab = styled(Tab)(
  ({theme}) => `
      border-radius:10px;
      min-height:0;
      margin:${theme.spacing(0, 2, 0, 0)};
      background-color:${theme.palette.secondary.light};
      &.Mui-selected {    
          background-color:${theme.palette.primary.light};
          color:white;
      }
      svg {
          font-size: 30px;
      }
  `
)
const ButtonTabsContainer = styled(Tabs)`
  margin: 15px 0;
  & .MuiTabs-indicator {
    display: none;
  }
`
const TabPanel = (props) => {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}
const ButtonTabs = ({tabs,activeTab,handleTabChange}) => {
  return (
    <>
      <ButtonTabsContainer value={activeTab} onChange={handleTabChange}>
        {tabs.map((tab) => (
          <ButtonTab
            key={tab.label}
            icon={tab.icon}
            iconPosition="start"
            label={tab.label}
            value={tab.label}
            id={tab.label}
            aria-controls={'tabpanel-' + tab.label}
          />
        ))}
      </ButtonTabsContainer>
      {tabs.map((tab) => (
        <TabPanel key={tab.label} value={activeTab} index={tab.label}>
          {tab.tabView}
        </TabPanel>
      ))}
    </>
  )
}

export default ButtonTabs
