//External
import {
    IsNotEmpty,
    IsString,
    Length
} from 'class-validator';


export class ProductSpecificationS3 {
    //Fields
    @IsNotEmpty({ message: 'The specification Uuid cannot be empty' })
    @IsString({ message: 'The specification Uuid must be of type string' })
    @Length(2, 36, { message: 'The value of the specification Uuid must be between 2 and 36 characters' })
    private specificationUuid: string;

    @IsNotEmpty({ message: 'The pdf file cannot be empty' })
    private pdfFile: any;

    //Constructor
    constructor($specificationUuid: string, $pdfFile: any) {

        this.specificationUuid = $specificationUuid;
        this.pdfFile = $pdfFile;

    }
    //Setters and getters
    public getspecificationUuid(): string {
        return this.specificationUuid;
    }

    public setspecificationUuid(specificationUuid: string): void {
        this.specificationUuid = specificationUuid;
    }

    public getPdfFile(): any {
        return this.pdfFile;
    }

    public setPdfFile(pdfFile: any): void {
        this.pdfFile = pdfFile;
    }


}