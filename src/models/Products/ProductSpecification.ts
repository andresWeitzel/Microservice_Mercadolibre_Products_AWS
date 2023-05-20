//External
import {
    IsInt,
    IsNotEmpty,
    IsString,
    Length,
    Max,
    Min
  } from 'class-validator';

const MAX_VALUE_INTEGER = (Number.MAX_SAFE_INTEGER - 1);




export class ProductSpecification {
    //Fields
    @IsNotEmpty({message: 'The product id cannot be empty'})
    @IsInt({message: 'The product id must be of type integer'})
    @Min(1,{message:'product id value must be greater than zero'})
    @Max(MAX_VALUE_INTEGER, {message:`product id value must be less than ${MAX_VALUE_INTEGER}`})
    private productId: number;

    @IsNotEmpty({message: 'The specification Uuid cannot be empty'})
    @IsString({message: 'The specification Uuid must be of type string'})
    @Length(2, 36, {message: 'The value of the specification Uuid must be between 2 and 36 characters'})
    private specificationUuid: string;

    @IsNotEmpty({message: 'The creation date cannot be empty'})
    @IsString({message: 'The creation date must be of type string'})
    @Length(2, 22, {message: 'The value of the creation date must be between 2 and 22 characters'})
    private creationDate: string;

    @IsNotEmpty({message: 'The update date cannot be empty'})
    @IsString({message: 'The update date must be of type string'})
    @Length(2, 22, {message: 'The value of the update date must be between 2 and 22 characters'})
    private updateDate: string;


    //Constructor
    constructor($productId: number, $specificationUuid: string, $creationDate: string, $updateDate: string) {
		this.productId = $productId;
		this.specificationUuid = $specificationUuid;
		this.creationDate = $creationDate;
        this.updateDate = $updateDate;
	}
    //Setters and getters
    public getproductId(): number {
        return this.productId;
    }

    public setproductId(productId: number): void {
        this.productId = productId;
    }

    public getspecificationUuid(): string {
        return this.specificationUuid;
    }

    public setspecificationUuid(specificationUuid: string): void {
        this.specificationUuid = specificationUuid;
    }
    
    public getCreationDate(): string {
        return this.creationDate;
    }

    public setCreationDate(creationDate: string): void {
        this.creationDate = creationDate;
    }

    public getUpdateDate(): string {
        return this.updateDate;
    }

    public setUpdateDate(updateDate: string): void {
        this.updateDate = updateDate;
    }

}