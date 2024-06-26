import api from '../apiService/apiService';
import { useRepo } from 'pinia-orm';
import Question from 'src/stores/model/question/Question';
import useQuestion from 'src/composables/question/questionMethods';

const repo = useRepo(Question);
const { createQuestionFromDTO } = useQuestion();

export default {
  async search(searchParam: string) {
    return await api()
      .get(`/questions/search?${new URLSearchParams(searchParam).toString()}`)
      .then((resp) => {
        this.generateAndSaveEntityFromDTO(resp.data);
        return resp;
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
  },
  generateAndSaveEntityFromDTO(dtoList: any) {
    dtoList.forEach((dto) => {
      const entity = createQuestionFromDTO(dto);
      repo.save(entity);
    });
  },
  deleteAllFromStorage() {
    repo.flush();
  },
  piniaGetAll() {
    return repo.query().orderBy('description', 'asc').get();
  },
  getByName(question: string) {
    return repo
      .query()
      .where('question', question)
      .orderBy('question', 'asc')
      .first();
  }
};