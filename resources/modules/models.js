const DataType = {
    Text: "text"
  }

  class Dataset{
    data = [[]]
    fileName = null
    fileSize
    mimeType
    sha256
    delimiter
    linebreak
    lastModified
    encoding = "utf-8"
    firstRowIsHeader = true
    errors = []
    /**
     * list of columns in the dataset
     * @type {DatasetColumn[]}
     * @public
     */
    columns = []

    constructor(input, fileName, mimeType, delimiter = undefined, firstRowIsHeader = true){
      this.fileName = fileName
      this.mimeType = mimeType
      this.firstRowIsHeader = firstRowIsHeader
      if(delimiter == undefined){
        this.delimiter = "," //should use the detector
      }
    }

    _parseData(){

    }
  }

  class CodeValue{
    value
    frequency
    label
    isMissingValue

    constructor(value, label, frequency = null, isMissingValue = null) {
      this.value = value;
      this.frequency = frequency;
      this.label = label;
      this.isMissingValue = isMissingValue;
    }
  }
  class DatasetColumn{
    position
    id
    name
    label
    description
    values = []
    /**
     * list of code values
     * @type {CodeValue[]}
     * @public
     */
    codeValues = []
    coded = false

    /**
     * varformat
     * @type {VarFormat}
     * @public
     */
    varFormat

    responseUnit
    valuesUnique
    hasIntendedDataType
    dataType = DataType.Text
    /**
     * Question object for the variable
     * @type {Question}
     * @public
     */
    question
    minValue
    maxValue

    constructor(id){
      this.id = id
      this.name=id
      this.question = new Question()
      this.varFormat = new VarFormat()
    }

    getConceptScheme(){
      var conceptScheme = {
        '@id' : '#conceptScheme-'+this.id,
        '@type' : "skos:ConceptScheme",
        'skos:hasTopConcept' : []
      }
      for(const v of this.getUniqueValues()){
        conceptScheme['skos:hasTopConcept'].push('#'+this.id + '-concept-' + v)
      }
      return conceptScheme
    }

    getUniqueValues(){
      return [... new Set(this.values)]
    }

    createCodeList(){
      if(!this.coded){
        this.codeValues = []
        return
      }
      for(const v of this.valuesUnique){
        this.codeValues.push(new CodeValue(v, null, this.values.filter(e => e === v).length))
      }
    }
  }

  class VarFormat{
    type
    schema
    otherCategory
  }

  class Question{
    preQuestionText
    questionText
    postQuestionText
    interviewerInstructions
  }
