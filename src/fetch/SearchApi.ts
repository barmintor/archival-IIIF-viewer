import Cache from "../lib/Cache";

export type HitType = {
    match: string;
    before: string;
    after: string;
    i: number;
    resource: AnnotationType;
}

export type AnnotationType = {
    id: string;
    on: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export default class SearchApi {

    static cache: {[key: string]: HitType[]} = {};

    static get(searchUrl: string, callback?: (hits: HitType[]) => void): any {

        if (this.cache.hasOwnProperty(searchUrl)) {
            if (callback !== undefined) {
                callback(this.cache[searchUrl]);
            }

            return;
        }


        this.fetchFromUrl(searchUrl, callback);
    }

    static fetchFromUrl(searchUrl: string, callback?: any) {
        fetch(searchUrl).then((response) => {

            const statusCode = response.status;

            if (statusCode !== 401 && statusCode >= 400) {
                const alertArgs = {
                    title: 'Error',
                    body: 'Could not fetch info.json!\n\n'  + searchUrl
                };
                Cache.ee.emit('alert', alertArgs);
                return;
            }

            response.json().then((json) => {

                const hits: HitType[] = [];
                let resources = json.resources;
                let i = 1;
                for (const hit of json.hits) {
                    for (const annotation of hit.annotations) {

                        const resource = resources.find((r: any) => r['@id'] === annotation);
                        if (!resource) {
                            continue;
                        }
                        let tmpArray = resource.on.split('#xywh=');
                        let position = tmpArray[1].split(',');

                        hits.push({
                            match: hit.match,
                            before: hit.before,
                            after: hit.after,
                            i: i++,
                            resource: {
                                id: resource['@id'],
                                on: tmpArray[0],
                                x: parseInt(position[0]),
                                y: parseInt(position[1]),
                                width: parseInt(position[2]),
                                height: parseInt(position[3]),
                            }
                        });
                    }
                }

                this.cache[searchUrl] = hits;


                if (callback !== undefined) {
                    callback(hits);
                }

            });
        }).catch((err) => {
            console.log(err);
            const alertArgs = {
                title: 'Error',
                body: 'Could not read info.json!\n\n'  + searchUrl
            };
            Cache.ee.emit('alert', alertArgs);
        });
    }
}
