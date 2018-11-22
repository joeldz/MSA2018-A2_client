import * as React from "react";
import Modal from 'react-responsive-modal';

interface IProps {
    currentScreenshot: any
}

interface IState {
    open: boolean
}

export default class ScreenshotDetail extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)   
        this.state = {
            open: false
        }
        this.updateScreenshot = this.updateScreenshot.bind(this)
        this.deleteScreenshot = this.deleteScreenshot.bind(this)
    }

	public render() {
        const currentScreenshot = this.props.currentScreenshot
        const { open } = this.state;
		return (
			<div className="container screenshot-wrapper">
                <div className="row screenshot-heading">
                    <b>{currentScreenshot.title}</b>&nbsp; ({currentScreenshot.tags})
                </div>
                <div className="row screenshot-date">
                    {currentScreenshot.uploaded}
                </div>
                <div className="row screenshot-img">
                    <img src={currentScreenshot.url}/>
                </div>
                
                <div className="row screenshot-done-button">
                    <div className="btn btn-primary btn-action" onClick={this.downloadScreenshot.bind(this, currentScreenshot.url)}>Download </div>
                    <div className="btn btn-primary btn-action" onClick={this.onOpenModal}>Edit </div>
                    <div className="btn btn-primary btn-action" onClick={this.deleteScreenshot.bind(this, currentScreenshot.id)}>Delete </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Screenshot Title</label>
                            <input type="text" className="form-control" id="screenshot-edit-title-input" placeholder="Enter Title"/>
                            <small className="form-text text-muted">You can edit any screenshot later</small>
                        </div>
                        <div className="form-group">
                            <label>Tag</label>
                            <input type="text" className="form-control" id="screenshot-edit-tag-input" placeholder="Enter Tag"/>
                            <small className="form-text text-muted">Tag is used for search</small>
                        </div>
                        <button type="button" className="btn" onClick={this.updateScreenshot}>Save</button>
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
    private downloadScreenshot(url: any) {
        window.open(url);
    }

    private updateScreenshot(){
        const titleInput = document.getElementById("screenshot-edit-title-input") as HTMLInputElement
        const tagInput = document.getElementById("screenshot-edit-tag-input") as HTMLInputElement
    
        if (titleInput === null || tagInput === null) {
            return;
        }
    
        const currentScreenshot = this.props.currentScreenshot
        const url = "https://jdez501screenshotapi.azurewebsites.net/api/screenshot/" + currentScreenshot.id
        const updatedTitle = titleInput.value
        const updatedTag = tagInput.value
        fetch(url, {
            body: JSON.stringify({
                "height": currentScreenshot.height,
                "id": currentScreenshot.id,
                "tags": updatedTag,
                "title": updatedTitle,
                "uploaded": currentScreenshot.uploaded,
                "url": currentScreenshot.url,
                "width": currentScreenshot.width
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

    private deleteScreenshot(id: any) {
        const url = "http://jdez501screenshotapi.azurewebsites.net/api/screenshot/" + id
    
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