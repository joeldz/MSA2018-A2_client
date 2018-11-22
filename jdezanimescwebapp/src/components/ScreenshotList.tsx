import * as React from "react";

interface IProps {
    screenshots: any[],
    selectNewScreenshot: any,
    searchByTag: any
}

export default class ScreenshotList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)   
        this.searchByTag = this.searchByTag.bind(this)
    }

	public render() {
		return (
			<div className="container screenshot-list-wrapper">
                <div className="row screenshot-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Tags" />
                        <div className="input-group-append">
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByTag}>Search</div>
                        </div>
                    </div>  
                </div>
                <div className="row screenshot-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
		);
    }

    // Construct table using screenshot list
	private createTable() {
        const table:any[] = []
        const screenshotList = this.props.screenshots
        if (screenshotList == null) {
            return table
        }

        for (let i = 0; i < screenshotList.length; i++) {
            const children = []
            const screenshot = screenshotList[i]
            children.push(<td key={"id" + i}>{screenshot.id}</td>)
            children.push(<td key={"name" + i}>{screenshot.title}</td>)
            children.push(<td key={"tags" + i}>{screenshot.tags}</td>)
            table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }
    
    // Screenshot selection handler to display selected screenshot in details component
    private selectRow(index: any) {
        const selectedScreenshot = this.props.screenshots[index]
        if (selectedScreenshot != null) {
            this.props.selectNewScreenshot(selectedScreenshot)
        }
    }

    // Search screenshot by tag
    private searchByTag() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const tag = textBox.value 
        this.props.searchByTag(tag)  
    }

}