import React, { Component } from "react";
//import { Task } from "../models/task";

interface TestProps{
    
}

interface color {
    value: string; category: string; darker: boolean
}

interface TestState {
    color: color[],
    filterColor: string,
    isDarker: boolean,
    random: number[],
    loading: boolean
    // Make all state optional! See Hack below
}

export default class Test extends Component<TestProps, TestState> {
        constructor(props: TestProps){
            super(props);
            this.onChange = this.onChange.bind(this);
            this.onChangeDarker = this.onChangeDarker.bind(this);

            this.state = {
                color: [
                    {value: 'Blue', category: 'Blue', darker: false},
                    {value: 'DarkBlue', category: 'Blue', darker: true},
                    {value: 'Green', category: 'Green', darker: false},
                    {value: 'DarkGreen', category: 'Green', darker: true},
                    {value: 'Red', category: 'Red', darker: false},
                    {value: 'DarkRed', category: 'Red', darker: true},
                    {value: 'Gray', category: 'Gray', darker: false},
                    {value: 'DarkGray', category: 'Gray', darker: true},
                    {value: 'SandyBrown', category: 'Brown', darker: false},
                    {value: 'Brown', category: 'Brown', darker: true},
                    {value: 'MediumPurple', category: 'Purple', darker: false},
                    {value: 'Purple', category: 'Purple', darker: true},
                    {value: 'Pink', category: 'Pink', darker: false},
                    {value: 'DeepPink', category: 'Pink', darker: true},
                ],
                filterColor: "",
                isDarker: false,
                random: [],
                loading: true
            }
        }

        componentDidMount(){
            console.log("Load Page")
            this.generateRandomColor();
        }

        generateRandomColor(){
            let random = []
            for (let i = 0; i < 5 ; i++) {
                for (let j = 0; j < 8; j++) {
                    let colorLength = this.state.color.length - 1;
                    let indexColor = Math.floor((Math.random() * colorLength) + 0);
                    random.push(indexColor);
                }
            }
            this.setState({
                random: random,
                loading: false
            })
        }

        createTable = () => {
        let table = []
        
        // Outer loop to create parent
        for (let i = 0; i < 5 ; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < 8; j++) {
            let indexColor = this.state.random[8*i+(j)]
            children.push(
                <div
                    className="filterDiv" 
                    style={
                        (this.state.filterColor.toLowerCase() != this.state.color[indexColor].category.toLowerCase() 
                        && this.state.filterColor != "")
                        || (this.state.isDarker != this.state.color[indexColor].darker && this.state.isDarker != false)
                        ?
                        {backgroundColor: this.state.color[indexColor].value, display: 'none'} :
                        {backgroundColor: this.state.color[indexColor].value}
                    }
                    key={i+"-"+j}
                >
                    {` ${this.state.color[indexColor].value}`}
                </div>)
          }
          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
        console.log("Random", this.state.random)
        return table
      }

      onChange(e:any){
        console.log(e.target.value);
        this.setState({
            filterColor: e.target.value
        })
      }

      onChangeDarker(e:any){
        this.setState({
            isDarker: !this.state.isDarker
        })
      }

      render() {
        if (this.state.loading){
            return "Loading"
        }
        return(
          <div>
            <div>
                <label>Filter by category</label><br/>
                <input type="text" onChange={this.onChange}></input>
            </div>
            <div>
                <label>Darker</label>
                <input type="checkbox" name="isDarker" checked={this.state.isDarker} onChange={this.onChangeDarker} />
            </div>
            {this.createTable()}
          </div>
        )
      }
}