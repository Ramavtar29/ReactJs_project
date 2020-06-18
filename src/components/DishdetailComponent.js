import React,{Component} from 'react';
import { Button, Modal,ModalHeader,ModalBody,Label,Col,Row,Card,CardImg,CardBody,CardText,CardTitle, Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm,Errors} from 'react-redux-form';



const required=(val)=> val && val.length;
const maxLength=(len)=>(val)=>!(val) || (val.length<= len);
const minLength=(len)=>(val)=>(val) && (val.length>= len);
class CommentForm extends Component{
  constructor(props){
    super(props);
    this.state={
      isModalOpen:false
    };

    this.handleSubmit=this.handleSubmit.bind(this);
    this.toggleModal=this.toggleModal.bind(this);

  }

  toggleModal(){
    this.setState({
      isModalOpen:!this.state.isModalOpen
    });
  }

handleSubmit(values){

  console.log("Current State is :"+ JSON.stringify(values));
  alert("Current State is :"+ JSON.stringify(values));


}

render(){
  return(
    <div >
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil" /> Submit Comment
        </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
              <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                         <Col>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name"
                                 className="form-control"
                                 validators={{
                                      required, minLength: minLength(3), maxLength: maxLength(15)
                                  }}
                                 />
                                 <Errors
                                  className="text-danger"
                                  model=".author"
                                  show="touched"
                                  messages={{
                                      required: 'Required',
                                      minLength: 'Must be greater than 2 characters',
                                      maxLength: 'Must be 15 characters or less'
                                  }}
                               />
                            </Col>
                        </Row>
                        <Row className="form-group">
                         <Col>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment" rows="6" name="comment" className="form-control"/>
                          </Col>
                        </Row>
                        <Row>
                        <Col>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Col>
                    </Row>
                  </LocalForm>
             </ModalBody>
        </Modal>
    </div>
   );
 }
}

 function	RenderComments({comments}){
		if(comments==null){
			return(<div></div>);
		}
		const comnts=comments.map((comment) =>{
			return(
				<li key={comment.id}>
					<p>
						{comment.comment}
					</p>
					<p>-- {comment.author}
					&nbsp;
					{new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}

					</p>
				</li>
			);
		})
		return(
			<div className="col-12 col-md-5 m-1">
				<h4> Comments</h4>
				<ul className="list-unstyle">
					{comnts}
				</ul>
        <CommentForm  />

			</div>
		);
	}

	function RenderDish({dish})
	{
		if (dish != null){
			return(

				<Card className="col-12 col-md-5 m-1">
					<CardImg width="100%" src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>

				</Card>

				);
		}
		else{
			return(<div></div>);
		}
	}


	const DishDetail=(props)=>{


		if(props.dish==null)
		{
			return (<div></div>);
		}


		return(
      <div className="container">
            <div className="row">
              			<Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              			</Breadcrumb>
              			<div className="col-12">
              				<h3>{props.dish.name}</h3>
              				<hr />
              			</div>
            </div>
      			<div className="row" >
      				<RenderDish dish={props.dish}/>
              <RenderComments comments={props.comments} />
            </div>
			</div>

			);

	}



export default DishDetail;
