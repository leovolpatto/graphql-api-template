export const { paginateResults } = require('./utils');
import { DataentitiesAPI } from './datasources/dataentities';
export default {
    Query: {
        getDesigners: async(_, args, context) => {
            const allDesigners = await context.injector.get(DataentitiesAPI).getDesigners(args);
            allDesigners.reverse();
            const page = args.page;
            const pageSize = args.pageSize;
            const listDesigner = paginateResults({
                page,
                pageSize,
                results: allDesigners
            })
            return {
                designer: listDesigner,
                cursor: listDesigner.length ? listDesigner[listDesigner.length - 1].cursor : null,
                // if the cursor of the end of the paginated results is the same as the
                // last item in _all_ results, then there are no more results after this
                hasMore: listDesigner.length ? listDesigner[listDesigner.length - 1].cursor !==
                    allDesigners[allDesigners.length - 1].cursor : false
            }
        },
        getSignedDesigns: async(_, args, context) => {
            const allSignedDesigns = await context.injector.get(DataentitiesAPI).getSignedDesigns(args);
            allSignedDesigns.reverse();
            const page = args.page;
            const pageSize = args.pageSize;
            const listSignedDesign = paginateResults({
                page,
                pageSize,
                results: allSignedDesigns
            })
            return {
                listSignedDesign,
                cursor: listSignedDesign.length ? listSignedDesign[listSignedDesign.length - 1].cursor : null,
                // if the cursor of the end of the paginated results is the same as the
                // last item in _all_ results, then there are no more results after this
                hasMore: listSignedDesign.length ? listSignedDesign[listSignedDesign.length - 1].cursor !==
                    allSignedDesigns[allSignedDesigns.length - 1].cursor : false
            }
        }
    },
}