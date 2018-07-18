
import React from 'react'
import ReactDOM from 'react-dom'
import "./index.less"

class Accordion extends React.Component {
    static defaultProps = {
        expandedPercent: 50, // %
        itemsGap: 1, // px
        itemsHeight: 100, // px...
    }
    
    constructor(props){
        super(props)
        this.state = {
            expandedIndex: 0,
        }
    }
    render(){
        const {state, props} = this
        const expendedItemStyle = {
            width: props.expandedPercent + '%',
            marginLeft: props.itemsGap,
            height: props.itemsHeight,
        }
        const unexpanedItemStyle = {
            width: `calc(${(100 - props.expandedPercent) / (props.items.length - 1)}% - ${props.itemsGap}px)`,
            marginLeft: props.itemsGap,
            height: props.itemsHeight,
        }
        
        const expandedIndex = state.expandedIndex >= props.items.length ? props.items.length - 1 : state.expandedIndex
        
        return (
            <div className="accordion" style={{height: props.itemsHeight}} >
            {props.items.map((item, i) => (
                <AccordionItem {...item} key={i} 
                expanded={i === expandedIndex}
                style={{
                    ...(i === expandedIndex ? expendedItemStyle : unexpanedItemStyle),
                    ...(i === 0 ? {marginLeft: 0} : {})
                }}
                onClick={() => this.expandTo(i)} >
                </AccordionItem>
            ))}
            </div>
        )
    }
    expandTo(i){
        i = +i
        i = i < 0 ? 0 : i
        i = i >= this.props.items.length ? this.props.items.length - 1 : i
        this.setState({expandedIndex: i})
    }
    prev(){
        this.expandTo(this.state.expandedIndex - 1)
    }
    next(){
        this.expandTo(this.state.expandedIndex + 1)
    }
}

class AccordionItem extends React.Component {
    render(){
        const {state, props} = this
        return (
            <div className={'accordion-item ' + (props.expanded && 'expanded ')}
            style={{background: props.bkg, ...props.style}}
            onClick={props.onClick} >
            <div className="accordion-item-text">{props.expanded ? props.text : props.short}</div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsKeys: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            itemsBkgs: ['#f00', '#ff0', '#f0f', '#0ff', '#00f'],
            items: [
                { text: "AAA", short: "e", bkg: '#f00' },
                { text: "BBB", short: "d", bkg: '#ff0' },
                { text: "CCC", short: "1", bkg: '#f0f' },
                { text: "DDD", short: "b", bkg: '#0ff' },
                { text: "EEE", short: "a", bkg: '#00f' },
            ]
        }
    }
    
    render() {
        const {state} = this
        return (
            <div>
            <button type="button" onClick={this.addItem}>Add Item</button>
            <button type="button" onClick={this.removeItem}>Remove Item</button>
            <button type="button" onClick={this.prev}>Prev</button>
            <button type="button" onClick={this.next}>Next</button>
            <Accordion items={state.items} ref={(x) => this.accordion = x} >
            </Accordion>
            </div>
        )
    }
    removeItem = () => {
        if (this.state.items.length <= 2){
            alert("Cannot remove: please keep at least 2 items.")
        } else {
            this.setState({
                items: this.state.items.slice(0, this.state.items.length - 1)
            })
        }
    }
    addItem = () => {
        const newItemKey = this.state.itemsKeys[this.state.items.length % this.state.itemsKeys.length]
        const newItemText = [newItemKey, newItemKey, newItemKey].join('')
        const newItemBkg = this.state.itemsBkgs[this.state.items.length % this.state.itemsBkgs.length]
        this.setState({
            items: this.state.items.concat([{
                text: newItemText,
                short: newItemKey,
                bkg: newItemBkg,
            }])
        })
    }
    prev = () => {
        this.accordion.prev()
    }
    next = () => {
        this.accordion.next()
    }
}

ReactDOM.render(<App />, document.querySelector("#app"))
