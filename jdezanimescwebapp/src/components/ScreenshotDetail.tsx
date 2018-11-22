import * as React from "react";
import Modal from 'react-responsive-modal';

interface IProps {
    currentMeme: any
}

interface IState {
    open: boolean
}

export default class MemeDetail extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)   
        this.state = {
            open: false
        }
        this.updateMeme = this.updateMeme.bind(this)
        this.deleteMeme = this.deleteMeme.bind(this)
    }

	public render() {
        const currentMeme = this.props.currentMeme
        const { open } = this.state;
		return (
			<div className="container screenshot-wrapper">
                <div className="row screenshot-heading">
                    <b>{currentMeme.title}</b>&nbsp; ({currentMeme.tags})
                </div>
                <div className="row screenshot-date">
                    {currentMeme.uploaded}
                </div>
                <div className="row screenshot-img">
                    <img src={currentMeme.url}/>
                </div>
                
                <div className="row screenshot-done-button">
                    <div className="btn btn-primary btn-action" onClick={this.downloadMeme.bind(this, currentMeme.url)}>Download </div>
                    <div className="btn btn-primary btn-action" onClick={this.onOpenModal}>Edit </div>
                    <div className="btn btn-primary btn-action" onClick={this.deleteMeme.bind(this, currentMeme.id)}>Delete </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Meme Title</label>
                            <input type="text" className="form-control" id="screenshot-edit-title-input" placeholder="Enter Title"/>
                            <small className="form-text text-muted">You can edit any screenshot later</small>
                        </div>
                        <div className="form-group">
                            <label>Tag</label>
                            <input type="text" className="form-control" id="screenshot-edit-tag-input" placeholder="Enter Tag"/>
                            <small className="form-text text-muted">Tag is used for search</small>
                        </div>
                        <button type="button" className="btn" onClick={this.updateMeme}>Save</button>
                    </form>
                </Modal>
            </div>
		);
    }

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
	  };
    
    // Modal Close
    private onCloseModal = () => {
		this.setState({ open: false });
    };

    // Open screenshot image in new tab
    private downloadMeme(url: any) {
        window.open(url);
    }

    private updateMeme(){
        const titleInput = document.getElementById("screenshot-edit-title-input") as HTMLInputElement
        const tagInput = document.getElementById("screenshot-edit-tag-input") as HTMLInputElement
    
        if (titleInput === null || tagInput === null) {
            return;
        }
    
        const currentMeme = this.props.currentMeme
        const url = "https://jdez501memeapi.azurewebsites.net/api/meme/" + currentMeme.id
        const updatedTitle = titleInput.value
        const updatedTag = tagInput.value
        fetch(url, {
            body: JSON.stringify({
                "height": currentMeme.height,
                "id": currentMeme.id,
                "tags": updatedTag,
                "title": updatedTitle,
                "uploaded": currentMeme.uploaded,
                "url": currentMeme.url,
                "width": currentMeme.width
            }),
            headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
            method: 'PUT'
        })
        .then((response : any) => {
            if (!response.ok) {
                // Error State
                alert(response.statusText + " " + url)
            } else {
                location.reload()
            }
        })
    }

    private deleteMeme(id: any) {
        const url = "http://jdez501memeapi.azurewebsites.net/api/meme/" + id
    
        fetch(url, {
            method: 'DELETE'
        })
        .then((response : any) => {
            if (!response.ok) {
                // Error Response
                alert(response.statusText)
            }
            else {
                location.reload()
            }
        })
    }
}