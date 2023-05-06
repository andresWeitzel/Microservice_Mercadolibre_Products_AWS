//External
import {
    IsNotEmpty,
    IsString,
    Length
  } from 'class-validator';


export class Product {
    //Fields
    @IsNotEmpty({message: 'The site id cannot be empty'})
    @IsString({message: 'The site id must be of type string'})
    @Length(2, 20, {message: 'The value of the site id must be between 2 and 20 characters'})
    private siteId: string;

    @IsNotEmpty({message: 'The title cannot be empty'})
    @IsString({message: 'The title must be of type string'})
    @Length(2, 100, {message: 'The value of the title must be between 2 and 100 characters'})
    private title: string;

    @IsString({message: 'The subtitle must be of type string'})
    @Length(2, 100, {message: 'The value of the subtitle must be between 2 and 100 characters'})
    private subtitle: string;
    
    private sellerId: number;
    private categoryId: string;
    private officialStoreId: string;
    private price: number;
    private basePrice: number;
    private originalPrice: number;
    private initialQuantity: number;
    private availableQuantity: number;
    private creationDate: Date;
    private updateDate: Date

    //Constructor
    constructor($siteId: string, $title: string, $subtitle: string, $sellerId: number, $categoryId: string, $officialStoreId: string, $price: number, $basePrice: number, $originalPrice: number, $initialQuantity: number, $availableQuantity: number, $creationDate: Date, $updateDate: Date) {
		this.siteId = $siteId;
		this.title = $title;
		this.subtitle = $subtitle;
		this.sellerId = $sellerId;
		this.categoryId = $categoryId;
		this.officialStoreId = $officialStoreId;
		this.price = $price;
		this.basePrice = $basePrice;
		this.originalPrice = $originalPrice;
		this.initialQuantity = $initialQuantity;
		this.availableQuantity = $availableQuantity;
		this.creationDate = $creationDate;
        this.updateDate = $updateDate;
	}
    //Setters and getters
    public getSiteId(): string {
        return this.siteId;
    }

    public setSiteId(siteId: string): void {
        this.siteId = siteId;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getSubtitle(): string {
        return this.subtitle;
    }

    public setSubtitle(subtitle: string): void {
        this.subtitle = subtitle;
    }

    public getSellerId(): number {
        return this.sellerId;
    }

    public setSellerId(sellerId: number): void {
        this.sellerId = sellerId;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }

    public getOfficialStoreId(): string {
        return this.officialStoreId;
    }

    public setOfficialStoreId(officialStoreId: string): void {
        this.officialStoreId = officialStoreId;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getBasePrice(): number {
        return this.basePrice;
    }

    public setBasePrice(basePrice: number): void {
        this.basePrice = basePrice;
    }

    public getOriginalPrice(): number {
        return this.originalPrice;
    }

    public setOriginalPrice(originalPrice: number): void {
        this.originalPrice = originalPrice;
    }

    public getInitialQuantity(): number {
        return this.initialQuantity;
    }

    public setInitialQuantity(initialQuantity: number): void {
        this.initialQuantity = initialQuantity;
    }

    public getAvailableQuantity(): number {
        return this.availableQuantity;
    }

    public setAvailableQuantity(availableQuantity: number): void {
        this.availableQuantity = availableQuantity;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }

    public setCreationDate(creationDate: Date): void {
        this.creationDate = creationDate;
    }

    public getUpdateDate(): Date {
        return this.updateDate;
    }

    public setUpdateDate(updateDate: Date): void {
        this.updateDate = updateDate;
    }

}