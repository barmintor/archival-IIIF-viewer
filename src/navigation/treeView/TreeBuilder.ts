import PresentationApi from "../../fetch/PresentationApi";
import IManifestData from "../../interface/IManifestData";
import ITree from "../../interface/ITree";
import {getLocalized} from "../../lib/ManifestHelpers";

class TreeBuilder {


    static get(url: string, tree?: ITree, done?: (finishedTree?: ITree) => void, limited?: boolean) {

        PresentationApi.get(
            url,
            async function(manifestData: IManifestData) {

                const tree2: ITree = {
                    id: manifestData.id,
                    label: getLocalized(manifestData.label),
                    isOpen: true,
                    children: []
                };
                for (const child of manifestData.collections) {
                    const newChild: ITree = {
                        id: child.id,
                        label: getLocalized(child.label),
                        children: []
                    }
                    if (tree && tree.id === child.id) {
                        newChild.children = tree.children;
                        newChild.isOpen = true;
                    }
                    tree2.children.push(newChild);
                }

                if(manifestData.parentId && limited !== true) {
                    TreeBuilder.get(manifestData.parentId, tree2, done);
                } else {
                    if (done) {
                        done(tree2);
                    }
                }

            }
        );

    };


}

export default TreeBuilder;
