/* eslint-disable default-case */
/* eslint-disable no-unreachable */
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import {useEffect, useMemo, useState, useCallback ,useRef} from 'react';
import {createEditor, Transforms,Editor,Text,Mark} from 'slate';
import {Slate, Editable, withReact, useSlate } from 'slate-react';
import {Button, Container, Form, Col, Row, Image, InputGroup} from 'react-bootstrap';
import { BsImage } from "react-icons/bs";
import { FaTextWidth } from "react-icons/fa";
import {BiSquareRounded} from "react-icons/bi";
import {AiOutlineQuestionCircle, AiOutlineCloseCircle} from "react-icons/ai"
import {jsx} from 'slate-hyperscript'


const MARK_TAGS = {
  emphasis: 'emphasis',
  rate    : 'rate',
}


function App() {

  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type    : 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])
  const [editorvalue, editorValue] = useState(value)
  

  const input = useRef(null);

  //function to handle emphasis button click
  function handleemphasisClick ()  {

    Editor.addMark(editor,'emph','true');

  }

  // function to handle fast button click 
  function handlefastClick ()  {

    Editor.addMark(editor,'fast','true');

  }
  
  //function to handle slow button click
  function handleslowClick ()  {

    Editor.addMark(editor,'slow','true');

  }


   //function to handle the render of leaf nodes on changes
   const renderLeaf = useCallback(props => {
     console.log("line: 61");
     console.log(props);

    if(props.leaf.emph)
      return props.children = <EmphasisMark {...props} />
    else if(props.leaf.fast){
      return props.children = <FastMark {...props} />
    } 
    else if(props.leaf.slow){
      return props.children = <SlowMark {...props} />
    } 
    else
      return <DefaultElement {...props} />  
  }, [])


    

  
  return (
    <div className = "App">
    <Container fluid>
      <Row     className = "row">
      <Col     sm        = {1} className = "left-side">
      <div     className = "left-div">
      <BsImage style     = {{fontSize:"64px"}}/>
          </div>
          <div         className = "left-div">
          <FaTextWidth style     = {{fontSize:"64px"}}/>
          </div>
          <div             className = "left-div">
          <BiSquareRounded style     = {{fontSize:"64px"}}/>
          </div>
          <div                     className = "left-div">
          <AiOutlineQuestionCircle style     = {{fontSize:"64px"}}/>
          </div>
            
        </Col>
        <Col sm = {1}>
        </Col>
        <Col sm = {10} className = "right-side">
        <p>Add Speech Tags</p>
        <Button className = "ssml-button emphasis" onClick = {()=>(handleemphasisClick())}>Emphasis</Button>
        <Button className = "ssml-button slow" onClick     = {()=>(handleslowClick())}>Slow</Button>
        <Button className = "ssml-button fast" onClick     = {()=>(handlefastClick())}>Fast</Button>
          <Slate
            editor   = {editor}
            value    = {value}
            onChange = {newValue => setValue(newValue)}
          >
          <Editable 
          className  = "slate"
          value      = {editorvalue}
          onChange   = {val => editorValue(val)}
          ref        = {input}
          renderLeaf = {renderLeaf}
          onKeyDown  = {(event,change)=>{
             console.log(editor);
          }}
    
          />
          </Slate>
        </Col>
      </Row>
    </Container>
       

       
    </div>
  );


}

function DeleteTag() {
  // const editor = useSlate();
  console.log(this);
    // Editor.deleteBackward(editor,'line');
    // console.log(editor);
  }

const FastMark = props => {
  return (
    <span className = "inside-fast"  {...props.attributes}>{props.children}<AiOutlineCloseCircle className = "cross-button" onClick = {() => (()=>(this.DeleteTag()))}/></span>
  )
}

const SlowMark = props => {
  return (
    <span className = "inside-slow"  {...props.attributes}>{props.children}<AiOutlineCloseCircle className = "cross-button" onClick = {()=>(DeleteTag())}/></span>
  )
}

const EmphasisMark = props => {
  return (
    <span className = "inside-emphasis"  {...props.attributes}>{props.children}<AiOutlineCloseCircle className = "cross-button" onClick = {() => (()=>(DeleteTag()))}/></span>
    
  )
  }





 const DefaultElement = props => {
  return <span {...props.attributes}>{props.children}</span>
  }

export default App;
