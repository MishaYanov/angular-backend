import { Get, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { itemDto } from './dto/item.dto';

@Injectable()
export class StoreService {
    constructor(private prisma: PrismaService){}
    //get all itmes
    async getAllItems() {
        return await this.prisma.product.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    image: true,
                    carCategory: {
                        select: {
                            name: true,
                        }
                    },
                    partCategory: {
                        select: {
                            name: true,
                        }
                    },

            }
    });
    }

    async addItem(item: itemDto){
        try{
            const newItem = await this.prisma.product.create({
            data: {
                name: item.name,
                price: item.price,
                description: item.description,
                image: item.image,
                carCategoryId: item.carCategoryId,
                partCategoryId: item.partCategoryId,
            }, select: {
                id: true,
                name: true,
                price: true,
                description: true,
                image: true,
                carCategoryId: true,
                partCategoryId: true,
                carCategory: {
                    select: {
                        name: true,
                    }
                },
                partCategory: {
                    select: {
                        name: true,
                    }
                },
            }
        });
        return newItem;
        }catch(error){
            throw new Error("Something went wrong: " + error.message);
        }
        
    }

    async updateItem(item: itemDto){
        try{
            const updatedItem = await this.prisma.product.update({
            where: {
                id: item.id,
            },data: {
                name: item.name,
                price: item.price,
                description: item.description,
                image: item.image,
                carCategoryId: item.carCategoryId,
                partCategoryId: item.partCategoryId,
            }, select: {
                id: true,
                name: true,
                price: true,
                description: true,
                image: true,
                carCategory: true,
                partCategory: true,
            }
        });
        return updatedItem;
        }catch(error){
            throw new Error("Something went wrong: " + error.message);
        }
        
    }
    async deleteItem(id: any){
        try{
            const deletedItem = await this.prisma.product.delete({
                where: {
                    id: parseInt(id),
                }
            });
            return deletedItem;
        }catch(error){
            throw new Error("Something went wrong: " + error.message);
        }
    }
    async getAllPartCategories(){
        return await this.prisma.partCategory.findMany();
    }
    async getAllCarCategories(){
        return await this.prisma.carCategory.findMany();
    }
    
}
