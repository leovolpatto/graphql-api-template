//export const { RESTDataSource } = require('apollo-datasource-rest');
import { RESTDataSource } from 'apollo-datasource-rest';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { assertValidSDL } from 'graphql/validation/validate';

@Injectable({
    scope: ProviderScope.Session
})

export class DataentitiesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://tokstok.vtexcommercestable.com.br/api/dataentities/'; 
    }
    private SORT: String = "&_sort=createdIn DESC";
    async getDesigners(args) {
        const response = await this.get('DS/search?_fields=_all'+this.SORT, undefined, {
            headers: {
                'Content-Type': 'application/json',

                }
        });
        return Array.isArray(response) ?
            response.map(designer => this.designerReducer(designer)) : []
    }


    async getSignedDesigns(args) {
        //console.log(args.sort.sortBy);
        //console.log('zero:'+JSON.parse(JSON.stringify(args.filter)[0]));
        // console.log('um:'+JSON.parse(JSON.stringify(args.filter)[1]));
        // console.log('um:'+JSON.parse(JSON.stringify(args.filter))[2]);
        const response = await this.get('DA/search?_fields=_all'+this.SORT, undefined, {
            headers: {
                'Content-Type': 'application/json',

                'REST-Range': 'resources=0-100'
            }
        });
        return Array.isArray(response) ?
            response.map(signedDesign => this.signedDesignReducer(signedDesign)) : []
    }


    signedDesignReducer(signedDesign) {
        return {
            id: signedDesign.id,
            fullPageBanner: signedDesign.bannerInterna,
            mobileFullPageBanner: signedDesign.bannerInternaMobile,
            collectionIsFeatured: signedDesign.collectionDestaque,
            collectionDescription: signedDesign.descCollection,
            collectionImage: signedDesign.collectionDestaque,
            collectionName: signedDesign.nomeCollection,
            collectionQuery: signedDesign.queryCollection,
            shelfImages: signedDesign.imagemShelfInterna,
            videoThumbnailUrl: signedDesign.imagemYoutube,
            videoUrl: signedDesign.linkYoutube,
            metatagDescription: signedDesign.metaTag,
            designerName: signedDesign.nomeDesigner,
            visualizationOrder: signedDesign.ordemVisualizacao,
            pageTitle: signedDesign.titlePagina
        }
    }
    designerReducer(designer) {
        return {
            id: designer.id,
            description: designer.DesignerDescription,
            image: designer.DesignerImage,
            name: designer.DesignerName,
            targetUrl: designer.DesignerURL,
            collectionId: designer.CollectionId,
            bannerUrl: designer.designerBanner
        }
    }
}